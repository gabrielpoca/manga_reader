import { get, uniq, keys } from 'lodash';

const initialState = {
  ongoingChapter: {},
  readChapters: {},
  all: [],
  mangas: {},
  chapters: {},
  search: '',
  ready: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'MANGA_REHYDRATE': {
      const { ongoing, read } = action.payload;

      const ongoingChapter = ongoing.reduce((memo, m) => {
        memo[m.mangaId] = m.chapterId;
        return memo;
      }, {});

      const readChapters = read.reduce((memo, m) => {
        memo[m.mangaId] = m.chapters;
        return memo;
      }, {});

      return {
        ...state,
        ready: true,
        ongoingChapter,
        readChapters,
      };
    }
    case 'MANGA_SEARCH': {
      const { query } = action.payload;
      return { ...state, search: query };
    }
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
      const existingManga = get(state.mangas, mangaId, {});

      return {
        ...state,
        mangas: {
          ...state.mangas,
          [mangaId]: { ...existingManga, ...manga },
        },
      };
    }
    case 'MANGA_READING_CHAPTER': {
      const { mangaId, chapterId } = action.payload;
      return {
        ...state,
        ongoingChapter: {
          ...state.ongoingChapter,
          [mangaId]: parseInt(chapterId, 10),
        },
      };
    }
    case 'MANGA_READ_CHAPTER': {
      const { mangaId, chapterId } = action.payload;
      const chapters = get(state.readChapters, mangaId, []);

      return {
        ...state,
        readChapters: {
          ...state.readChapters,
          [mangaId]: uniq([parseInt(chapterId, 10), ...chapters]),
        },
      };
    }
    case 'MANGA_RESTORE_COMPLETED': {
      const { ongoingChapter, readChapters } = action.payload;

      return {
        ...state,
        ongoingChapter,
        readChapters,
      };
    }
    default:
      return state;
  }
};

export const getOngoingMangas = state => {
  return keys(state.manga.ongoingChapter);
};

export const getOngoingChapterByManga = state => {
  return state.manga.ongoingChapter;
};

export const getOngoingChapter = (state, mangaId) =>
  get(state.manga.ongoingChapter, mangaId, null);

export const getReadChaptersForManga = (state, mangaId) =>
  get(state.manga.readChapters, mangaId) || [];

export const getStateForBackup = state => ({
  readChapters: state.manga.readChapters,
  ongoingChapter: state.manga.ongoingChapter,
});

export const getAllMangas = state => get(state.manga, 'all', []);

export const getManga = (state, mangaId) => state.manga.mangas[mangaId];

export const getChapter = (state, mangaId, chapterId) =>
  state.manga.chapters[`${mangaId}_${chapterId}`];

export const getSearchQuery = state => state.manga.search;

export const ready = state => state.manga.ready;
