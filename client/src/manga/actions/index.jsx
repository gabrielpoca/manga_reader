export const readingChapter = (mangaId, chapterId) => {
  return {
    type: 'MANGA_READING_CHAPTER',
    payload: { mangaId, chapterId },
  };
};

export const readChapter = (mangaId, chapterId) => {
  return {
    type: 'MANGA_READ_CHAPTER',
    payload: {
      chapterId,
      mangaId,
    },
  };
};

export const restoreBackup = (
  ongoingChapterByMangaId,
  readChaptersByMangaId
) => {
  return {
    type: 'MANGA_RESTORE_BACKUP',
    payload: {
      ongoingChapterByMangaId,
      readChaptersByMangaId,
    },
  };
};

export const allMangaRequest = () => ({
  type: 'MANGA_ALL_REQUEST',
  payload: {},
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
