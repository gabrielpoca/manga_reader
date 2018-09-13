import Dexie from 'dexie';

const db = new Dexie('manga');

db.version(1).stores({
  mangas: 'mangaId,&name,*chapters',
  chapters: '[mangaId+chapterId]',
  ongoing: 'mangaId',
  read: 'mangaId,*chapters',
});

window.db = db;

export default db;
