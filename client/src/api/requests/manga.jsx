import React from 'react';

import db from './database';
import client from './client';

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

export default class RequestManga extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      manga: null,
      error: null
    };
  }

  componentDidMount() {
    const { mangaId } = this.props.params;

    this.updateData(mangaId);

    client
      .request(query, { mangaId })
      .then(data => db.mangas.put(data.manga))
      .then(this.updateData);
  }

  componentWillReceiveProps(props) {
    if (props.params === this.props.params) return;

    const { mangaId } = props.params;

    this.updateData(mangaId);

    client
      .request(query, { mangaId })
      .then(manga => db.mangas.put(manga))
      .then(this.updateData);
  }

  updateData = mangaId => {
    db.mangas
      .get({ mangaId })
      .then(
        manga => manga && this.setState({ manga, loading: false, error: null })
      )
      .catch(error => this.setState({ manga: null, loading: false, error }));
  };

  render() {
    return this.props.children(this.state);
  }
}
