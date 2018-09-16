export const rehydrate = (read, ongoing) => {
  return {
    type: 'MANGA_REHYDRATE',
    payload: { read, ongoing },
  };
};

export const readingChapter = (mangaId, chapterId) => {
  return {
    type: 'MANGA_READING_CHAPTER',
    payload: { mangaId, chapterId: parseInt(chapterId, 10) },
  };
};

export const readChapter = (mangaId, chapterId) => {
  return {
    type: 'MANGA_READ_CHAPTER',
    payload: {
      chapterId: parseInt(chapterId, 10),
      mangaId,
    },
  };
};

export const restoreCompleted = (ongoingChapter, readChapters) => {
  return {
    type: 'MANGA_RESTORE_COMPLETED',
    payload: {
      ongoingChapter,
      readChapters,
    },
  };
};

export const restoreError = err => ({
  type: 'MANGA_RESTORE_ERROR',
  payload: { err },
});

export const allMangaRequest = ({ query } = {}) => ({
  type: 'MANGA_ALL_REQUEST',
  payload: { query },
});

export const allMangaSuccess = mangas => ({
  type: 'MANGA_ALL_SUCCESS',
  payload: { mangas },
});

export const allMangaError = () => ({
  type: 'MANGA_ALL_ERROR',
  payload: {},
});

export const mangaRequest = mangaId => ({
  type: 'MANGA_REQUEST',
  payload: { mangaId },
});

export const mangaSuccess = manga => ({
  type: 'MANGA_SUCCESS',
  payload: { manga },
});

export const mangaError = () => ({
  type: 'MANGA_ERROR',
  payload: {},
});

export const chapterRequest = (mangaId, chapterId) => ({
  type: 'MANGA_CHAPTER_REQUEST',
  payload: { mangaId, chapterId },
});

export const chapterSuccess = chapter => ({
  type: 'MANGA_CHAPTER_SUCCESS',
  payload: { chapter },
});

export const chapterError = () => ({
  type: 'MANGA_CHAPTER_ERROR',
  payload: {},
});

export const search = (query = '') => ({
  type: 'MANGA_SEARCH',
  payload: { query },
});

export const backup = () => ({
  type: 'MANGA_BACKUP',
  payload: {},
});

export const restoreRequested = file => ({
  type: 'MANGA_RESTORE_REQUESTED',
  payload: { file },
});
