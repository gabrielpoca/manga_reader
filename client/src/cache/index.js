import { range } from 'lodash';

import { cacheChapter, uncacheChapter } from './chapter';
import * as manga from '../manga';

export const middleware = store => next => action => {
  if (action.type === 'MANGA_SET_CHAPTER') {
    const { mangaId, id } = action.payload;
    cacheNextChapter(mangaId, id);
  }

  if (action.type === 'MANGA_READ_CHAPTER') {
    const { mangaId, chapterId } = action.payload;
    // cacheFollowingChapters(mangaId, chapterId);
    // uncachePreviousChapters(store.getState(), mangaId, chapterId);
  }

  return next(action);
};

const cacheNextChapter = (mangaId, chapterId) => {
  // cacheChapter(mangaId, chapterId + 1);
};

const cacheFollowingChapters = async (mangaId, chapterId) => {
  // await cacheChapter(mangaId, chapterId + 1);
  // await cacheChapter(mangaId, chapterId + 2);
  // cacheChapter(mangaId, chapterId + 3);
};

const uncachePreviousChapters = (state, mangaId, chapterId) => {
  // range(1, chapterId - 1).forEach(async id => {
  //   const chapter = manga.filters.getChapter(state, mangaId, id)
  //   if (chapter) {
  //     await uncacheChapter(chapter)
  //   }
  // })
};
