import client from './client';

const mangasQuery = `
    query {
      mangas {
        name
        mangaId
        cover
      }
    }
  `;

const mangaQuery = `
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

const chapterQuery = `
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
    }
  `;

const chapter = (mangaId, chapterId) =>
  client.request(chapterQuery, { mangaId, chapterId }).then(res => res.chapter);

const manga = mangaId =>
  client.request(mangaQuery, { mangaId }).then(res => res.manga);

const mangas = () => client.request(mangasQuery, {}).then(res => res.mangas);

export { mangas, chapter, manga };
