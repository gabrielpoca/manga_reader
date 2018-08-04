import client from '../client';

const query = `
    query {
      mangas {
        name
        mangaId
        cover
      }
    }
  `;

const get = () => client.request(query, {});

export { get };
