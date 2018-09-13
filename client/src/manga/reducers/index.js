import { get, uniq, keys } from 'lodash';

const initialState = {
  ongoingChapterByMangaId: {},
  readChaptersByMangaId: {},
  all: [],
  byId: {},
  chapters: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'MANGA_ALL_SUCCESS': {
      const { mangas } = action.payload;
      return {
        ...state,
        all: mangas,
      };
    }
    case 'MANGA_CHAPTER_SUCCESS': {
      const { chapter } = action.payload;
      const { mangaId, chapterId } = chapter;

      return {
        ...state,
        chapters: {
          ...state.chapters,
          [`${mangaId}_${chapterId}`]: { ...chapter },
        },
      };
    }
    case 'MANGA_SUCCESS': {
      const { manga } = action.payload;
      const mangaId = manga.mangaId;
      const existingManga = get(state.byId, mangaId, {});

      return {
        ...state,
        byId: {
          ...state.byId,
          [mangaId]: { ...existingManga, ...manga },
        },
      };
    }
    case 'MANGA_READING_CHAPTER': {
      const { mangaId, chapterId } = action.payload;
      return {
        ...state,
        ongoingChapterByMangaId: {
          ...state.ongoingChapterByMangaId,
          [mangaId]: parseInt(chapterId, 10),
        },
      };
    }
    case 'MANGA_READ_CHAPTER': {
      const { mangaId, chapterId } = action.payload;
      const chapters = get(state.readChaptersByMangaId, mangaId, []);

      return {
        ...state,
        readChaptersByMangaId: {
          ...state.readChaptersByMangaId,
          [mangaId]: uniq([parseInt(chapterId, 10), ...chapters]),
        },
      };
    }
    case 'MANGA_RESTORE_BACKUP': {
      const { ongoingChapterByMangaId, readChaptersByMangaId } = action.payload;

      return {
        ...state,
        ongoingChapterByMangaId,
        readChaptersByMangaId,
      };
    }
    default:
      return state;
  }
};

export const getOngoingMangas = state => {
  return keys(state.manga.ongoingChapterByMangaId);
};

export const getOngoingChapterByManga = state => {
  return state.manga.ongoingChapterByMangaId;
};

export const getOngoingChapter = (state, mangaId) =>
  get(state.manga.ongoingChapterByMangaId, mangaId, null);

export const getReadChaptersForManga = (state, mangaId) =>
  get(state.manga.readChaptersByMangaId, mangaId) || [];

export const getStateForBackup = state => ({
  readChaptersByMangaId: state.manga.readChaptersByMangaId,
  ongoingChapterByMangaId: state.manga.ongoingChapterByMangaId,
});

export const getAllMangas = state => get(state.manga, 'all', []);

export const byId = (state, mangaId) => state.manga.byId[mangaId];

export const getChapter = (state, mangaId, chapterId) =>
  state.manga.chapters[`${mangaId}_${chapterId}`];
