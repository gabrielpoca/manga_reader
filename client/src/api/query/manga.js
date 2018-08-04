import client from '../client';
import db from '../database';
import EventEmitter from './eventEmitter';

const query = `
    query($mangaId: String!) {
      manga(mangaId: $mangaId) {
        name
        mangaId
        cover
        chapters {
          name
          chapterId
          mangaId
        }
      }
    }
  `;

class Manga {
  constructor() {
    this.emitters = {};
  }

  subscribe(mangaId, cb) {
    this.getEmitter(mangaId).addEventListener('changed', cb);
    this.sendMangaFromDB(mangaId);
    setTimeout(() => this.sendMangaFromNetwork(mangaId), 0);
  }

  unsubscribe(mangaId, cb) {
    this.getEmitter(mangaId).removeEventListener('changed', cb);
  }

  async sendMangaFromDB(mangaId) {
    try {
      const manga = await db.mangas.get(mangaId);
      if (manga) this.notify(manga);
    } catch (err) {
      console.error(err);
    }
  }

  async sendMangaFromNetwork(mangaId) {
    try {
      const { manga } = await client.request(query, { mangaId });
      if (manga) {
        db.mangas.put(manga);
        this.notify(manga);
      }
    } catch (err) {
      console.error(err);
    }
  }

  notify(manga) {
    const changeEvent = new CustomEvent('changed', { detail: { manga } });
    this.getEmitter(manga.mangaId).dispatchEvent(changeEvent);
  }

  getEmitter(mangaId) {
    if (!this.emitters[mangaId]) this.emitters[mangaId] = new EventEmitter();
    return this.emitters[mangaId];
  }
}

export default new Manga();
