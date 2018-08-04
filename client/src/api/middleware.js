import { range } from 'lodash';

import { cacheChapter, uncacheChapter } from './query/chapter';

export default store => next => action => {
  if (action.type === 'MANGA_READ_CHAPTER') {
    const { mangaId, chapterId } = action.payload;
    cacheFollowingChapters(mangaId, parseInt(chapterId, 10));
    uncachePreviousChapters(store.getState(), mangaId, parseInt(chapterId, 10));
  }

  return next(action);
};

const cacheFollowingChapters = async (mangaId, chapterId) => {
  await cacheChapter(mangaId, chapterId + 1);
  await cacheChapter(mangaId, chapterId + 2);
  cacheChapter(mangaId, chapterId + 3);
};

const uncachePreviousChapters = (state, mangaId, chapterId) => {
  range(1, chapterId - 1).forEach(async id => {
    await uncacheChapter(mangaId, chapterId);
  });
};
