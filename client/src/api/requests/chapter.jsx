import React from 'react';

import cancelablePromise from './cancelablePromise';
import db from './database';

import client from './client';

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

export default class RequestChapter extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      manga: null,
      chapter: null,
      error: null
    };
  }

  componentDidMount() {
    const { mangaId, chapterId } = this.props.params;

    this.updateData(mangaId, chapterId);
    this.cancelRequest();

    this.request = cancelablePromise(
      client.request(query, { mangaId, chapterId })
    );

    this.request.promise
      .then(data => {
        return Promise.all([
          db.mangas.put(data.manga),
          db.chapters.put(data.chapter)
        ]);
      })
      .then(() => this.updateData(mangaId, chapterId))
      .catch(error => this.setState({ loading: false, error }));
  }

  componentWillReceiveProps(props) {
    if (props.params === this.props.params) return;

    const { mangaId, chapterId } = props.params;

    this.updateData(mangaId, chapterId);
    this.cancelRequest();

    this.request = cancelablePromise(
      client.request(query, { mangaId, chapterId })
    );

    this.request.promise.then(data => {
      return Promise.all([
        db.mangas.put(data.manga),
        db.chapters.put(data.chapter)
      ])
        .then(() => this.updateData(mangaId, chapterId))
        .catch(error => this.setState({ loading: false, error }));
    });
  }

  componentWillUnmount() {
    this.cancelRequest();
  }

  cancelRequest = () => {
    if (this.request) this.request.cancel();
  };

  updateData = (mangaId, chapterId) => {
    clearInterval(this.timer);
    this.timer = setInterval(() => this.setState({ loading: true }), 250);

    Promise.all([
      db.chapters.get({ mangaId, chapterId }),
      db.mangas.get({ mangaId })
    ])
      .then(([chapter, manga]) => {
        if (!chapter || !manga) return;

        clearInterval(this.timer);

        this.setState({ loading: false, chapter, manga });
      })
      .catch(error => this.setState({ loading: false, error, data: null }));
  };

  render() {
    return this.props.children(this.state);
  }
}
