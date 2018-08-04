import db from '../database';

import client from '../client';

const query = `
    query($mangaId: String!, $chapterId: ID!) {
      chapter(mangaId: $mangaId, chapterId: $chapterId) {
        name
        mangaId
        chapterId
        pages {
          pageId
          src
        }
      }

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

export const cacheChapter = async (mangaId, chapterId) => {
  try {
    const { chapter } = await client.request(query, { mangaId, chapterId });

    await db.chapters.put(chapter);

    const imageCache = await caches.open('image-cache');

    await Promise.all(
      chapter.pages.map(async page => {
        const pageResponse = await fetch(page.src, { mode: 'no-cors' });
        return imageCache.put(page.src, pageResponse);
      })
    );
  } catch (err) {
    console.error(err);
  }
};

export const uncacheChapter = async (mangaId, chapterId) => {
  try {
    const { chapter } = await client.request(query, { mangaId, chapterId });
    const imageCache = await caches.open('image-cache');
    await Promise.all(
      chapter.pages.map(async ({ src }) => await imageCache.delete(src))
    );
    await db.chapters.delete(chapter.chapterId);
  } catch (err) {
    console.error(err);
  }
};

export const get = (mangaId, chapterId) =>
  client.request(query, { mangaId, chapterId });
