import { get, uniq, keys } from 'lodash';
import { keyframes } from '../../../../node_modules/styled-components';

const initialState = {
  ongoingChapterByMangaId: {},
  readChaptersByMangaId: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'MANGA_READING_CHAPTER': {
      const { mangaId, chapterId } = action.payload;
      return {
        ...state,
        ongoingChapterByMangaId: {
          ...state.ongoingChapterByMangaId,
          [mangaId]: chapterId
        }
      };
    }
    case 'MANGA_READ_CHAPTER': {
      const { mangaId, chapterId } = action.payload;
      const chapters = get(state.readChaptersByMangaId, mangaId, []);

      return {
        ...state,
        readChaptersByMangaId: {
          ...state.readChaptersByMangaId,
          [mangaId]: uniq([chapterId, ...chapters])
        }
      };
    }
    case 'MANGA_RESTORE_BACKUP': {
      const { ongoingChapterByMangaId, readChaptersByMangaId } = action.payload;

      return {
        ...state,
        ongoingChapterByMangaId,
        readChaptersByMangaId
      };
    }
    default:
      return state;
  }
};

export const getOngoingMangas = state => {
  return keys(state.manga.ongoingChapterByMangaId);
};

export const getOngoingChapter = (state, mangaId) =>
  get(state.manga.ongoingChapterByMangaId, mangaId, null);

export const getReadChaptersForManga = (state, mangaId) =>
  get(state.manga.readChaptersByMangaId, mangaId) || [];

export const getStateForBackup = state => ({
  readChaptersByMangaId: state.manga.readChaptersByMangaId,
  ongoingChapterByMangaId: state.manga.ongoingChapterByMangaId
});
