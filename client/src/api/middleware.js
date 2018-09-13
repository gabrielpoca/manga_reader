//import { range } from 'lodash';
//import dexie from 'dexie';

//import { updateProgress } from './queries/user';
//import { cacheChapter, uncacheChapter } from './queries/chapter';
//import { actions as mangaActions, filters as mangaFilters } from '../manga';
//import { persistor } from '../store';

export default store => next => action => {
  return next(action);
  //const res = next(action);

  //if (action.type === 'MANGA_READ_CHAPTER') {
  //const { mangaId, chapterId } = action.payload;
  //cacheFollowingChapters(mangaId, parseInt(chapterId, 10));
  //uncachePreviousChapters(store.getState(), mangaId, parseInt(chapterId, 10));
  //}

  //if (action.type === 'ACCOUNT_LEAVE') {
  //Promise.all([persistor.purge(), localStorage.clear(), dexie.delete()]).then(
  //() => window.location.reload()
  //);
  //}

  //if (
  //(action.type === 'persist/REHYDRATE' && action.payload) ||
  //action.type === 'MANGA_READING_CHAPTER' ||
  //action.type === 'MANGA_RESTORE_BACKUP' ||
  //action.type === 'MANGA_READ_CHAPTER'
  //) {
  //const user = accountFilters.getUser(store.getState());

  //if (user) {
  //const progress = mangaFilters.getStateForBackup(store.getState());

  //syncAccount(user, progress)
  //.then(newProgress =>
  //store.dispatch(mangaActions.syncProgress(newProgress))
  //)
  //.catch(err => console.log(err));
  //}
  //}

  //return res;
};

//const syncAccount = async (user, progress) => {
//try {
//const newProgress = await updateProgress(
//progress.ongoingChapterByMangaId,
//progress.readChaptersByMangaId,
//user.token
//);

//return newProgress;
//} catch (e) {
//console.error(e);
//}
//};

//const cacheFollowingChapters = async (mangaId, chapterId) => {
//await cacheChapter(mangaId, chapterId + 1);
//await cacheChapter(mangaId, chapterId + 2);
//cacheChapter(mangaId, chapterId + 3);
//};

//const uncachePreviousChapters = (state, mangaId, chapterId) => {
//range(1, chapterId - 1).forEach(async id => {
//await uncacheChapter(mangaId, chapterId);
//});
//};
