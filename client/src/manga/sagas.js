import { take, call, put, fork } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as API from '../api/queries';
import * as actions from './actions';
import db from '../api/database';

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

export function* mangasRoot() {
  while (yield take('MANGA_ALL_REQUEST')) {
    let mangas = yield call(dbRequest, () => db.mangas.toArray());

    if (!mangas || mangas.length === 0) {
      mangas = yield call(apiRequest, API.mangas);
      db.mangas.bulkAdd(mangas).catch(err => console.error(err));
    }

    if (!!mangas && mangas.length !== 0) {
      yield put(actions.allMangaSuccess(mangas));
    } else {
      yield put(actions.allMangaError());
    }
  }
}

export function* mangaApiRequest(mangaId) {
  const manga = yield call(apiRequest, () => API.manga(mangaId));
  yield call(dbRequest, () => db.mangas.update(mangaId, manga));
  yield put(actions.mangaSuccess(manga));
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

        yield call(dbRequest, () => db.chapter.put(chapter));
      }

      yield put(actions.chapterSuccess(chapter));
    });
  }
}

export default function* root() {
  yield fork(mangasRoot);
  yield fork(mangaRoot);
  yield fork(chapterRoot);
}
