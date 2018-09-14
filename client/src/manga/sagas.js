import { take, takeLatest, call, put, fork, select } from 'redux-saga/effects';
import _, { uniq } from 'lodash';
import { delay } from 'redux-saga';
import * as API from '../core/queries';
import * as actions from './actions';
import * as filters from './reducers';
import db from '../core/database';

export function* apiRequest(fn) {
  while (true) {
    try {
      return yield call(fn);
    } catch (error) {
      console.error(error);
      yield call(delay, 2000);
    }
  }
}

export function* dbRequest(fn) {
  try {
    return yield call(fn);
  } catch (error) {
    console.error(error);
  }
}

function* mangasDBSearch(query) {
  if (query && query !== '')
    return yield db.mangas
      .orderBy('name')
      .filter(
        manga => manga.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
      )
      .limit(20)
      .toArray();

  const ongoingIds = (yield call(dbRequest, () => db.ongoing.toArray())).map(
    m => m.mangaId
  );

  const ongoingMangas = yield call(dbRequest, () =>
    db.mangas
      .where('mangaId')
      .anyOf(ongoingIds)
      .toArray()
  );

  const mangas = yield db.mangas
    .orderBy('name')
    .limit(20)
    .toArray();

  return _.chain([...ongoingMangas, ...mangas])
    .uniqBy('mangaId')
    .take(20)
    .value();
}

export function* mangasRoot() {
  yield takeLatest('MANGA_ALL_REQUEST', function*({ payload }) {
    let searchQuery = payload.query;

    if (searchQuery === undefined)
      searchQuery = (yield select(filters.getSearchQuery)) || '';

    yield put(actions.search(searchQuery));

    yield delay(500);

    let mangas = yield call(mangasDBSearch, searchQuery);

    if (!mangas || mangas.length === 0) {
      mangas = yield call(apiRequest, API.mangas);
      db.mangas.bulkAdd(mangas).catch(err => console.error(err));
      mangas = yield call(mangasDBSearch, searchQuery);
    }

    yield put(actions.allMangaSuccess(mangas));
  });
}

export function* mangaApiRequest(mangaId) {
  const manga = yield call(apiRequest, () => API.manga(mangaId));
  yield call(dbRequest, () => db.mangas.update(mangaId, manga));
  yield put(actions.mangaSuccess(manga));
  yield fork(cacheMangaCover, manga);
}

export function* mangaRoot() {
  while (true) {
    const { payload } = yield take('MANGA_REQUEST');

    let manga = yield call(dbRequest, () => db.mangas.get(payload));

    if (manga) {
      yield put(actions.mangaSuccess(manga));
    }

    yield fork(mangaApiRequest, payload.mangaId);
  }
}

function* chapterRoot() {
  while (true) {
    const { payload } = yield take('MANGA_CHAPTER_REQUEST');

    yield fork(function*() {
      let chapter = yield call(dbRequest, () => db.chapters.get(payload));

      if (!chapter) {
        chapter = yield call(apiRequest, () =>
          API.chapter(payload.mangaId, payload.chapterId)
        );

        yield call(dbRequest, () => db.chapters.put(chapter));
      }

      yield put(actions.chapterSuccess(chapter));
    });
  }
}

function* cacheMangaCover(manga) {
  const coverCache = yield call(() => caches.open('cover-cache'));
  const cover = yield call(() => fetch(manga.cover, { mode: 'no-cors' }));
  return coverCache.put(manga.cover, cover);
}

function* cacheChapter(mangaId, chapterId) {
  try {
    const chapter = yield call(API.chapter, mangaId, chapterId);

    yield call(() => db.chapters.put(chapter));

    const imageCache = yield call(() => caches.open('image-cache'));

    yield call(() =>
      Promise.all(
        chapter.pages.map(async page => {
          const pageResponse = await fetch(page.src, { mode: 'no-cors' });
          return imageCache.put(page.src, pageResponse);
        })
      )
    );
  } catch (err) {
    console.error(err);
  }
}

function* uncacheChapter(mangaId, chapterId) {
  try {
    const chapter = yield call(() =>
      db.chapters.get({ mangaId, chapterId: chapterId + '' })
    );

    if (!chapter) return;

    const imageCache = yield call(() => caches.open('image-cache'));
    yield call(() =>
      Promise.all(
        chapter.pages.map(async ({ src }) => await imageCache.delete(src))
      )
    );

    yield call(() => db.chapters.delete(chapter.chapterId));
  } catch (err) {
    console.error(err);
  }
}

function* readingRoot() {
  while (true) {
    const { payload } = yield take('MANGA_READING_CHAPTER');

    yield call(dbRequest, () => db.ongoing.put(payload));
    yield fork(cacheChapter, payload.mangaId, payload.chapterId + 1);
    yield fork(uncacheChapter, payload.mangaId, payload.chapterId - 1);
  }
}

function* readRoot() {
  while (true) {
    const { payload } = yield take('MANGA_READ_CHAPTER');

    yield call(dbRequest, () => {
      db.transaction('rw', db.read, async () => {
        let read = await db.read.get({ mangaId: payload.mangaId });

        if (!read) read = { mangaId: payload.mangaId, chapters: [] };

        read.chapters.push(payload.chapterId);
        read.chapters = uniq(read.chapters);

        await db.read.put(read);
      });
    });
  }
}

function* rehydrate() {
  const read = yield call(dbRequest, () => db.read.toArray());
  const ongoing = yield call(dbRequest, () => db.ongoing.toArray());
  yield put(actions.rehydrate(read, ongoing));
}

export default function* root() {
  yield fork(rehydrate);
  yield fork(mangasRoot);
  yield fork(mangaRoot);
  yield fork(chapterRoot);
  yield fork(readingRoot);
  yield fork(readRoot);
}
