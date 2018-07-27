export const readingChapter = (mangaId, chapterId) => {
  return {
    type: 'MANGA_READING_CHAPTER',
    payload: { mangaId, chapterId }
  };
};

export const readChapter = (mangaId, chapterId) => {
  return {
    type: 'MANGA_READ_CHAPTER',
    payload: {
      chapterId,
      mangaId
    }
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
      readChaptersByMangaId
    }
  };
};
