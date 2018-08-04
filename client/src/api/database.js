import Dexie from 'dexie';

const db = new Dexie('manga');

db.version(1).stores({
  mangas: 'mangaId,*chapters',
  chapters: '[mangaId+chapterId]'
});

window.db = db;

export default db;
