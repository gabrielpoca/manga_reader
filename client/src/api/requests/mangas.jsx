import React from 'react';

import db from './database';
import client from './client';

const query = `
    query {
      mangas {
        name
        mangaId
        cover
      }
    }
  `;

export default class RequestMangas extends React.Component {
  constructor() {
    super();

    this.state = {
      response: {
        loading: true,
        mangas: null,
        error: null
      }
    };
  }

  componentDidMount() {
    window.addEventListener('online', this.toggleOnline);
    window.addEventListener('offline', this.toggleOffline);

    this.updateData();

    client
      .request(query, {})
      .then(response => db.mangas.bulkPut(response.mangas))
      .then(this.updateData);
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.toggleOnline);
    window.removeEventListener('offline', this.toggleOffline);
  }

  updateData = () => {
    if (navigator.onLine) {
      this.toggleOnline();
    } else {
      this.toggleOffline();
    }
  };

  toggleOnline = () => {
    db.mangas
      .toArray()
      .then(mangas =>
        this.setState({
          response: { loading: false, mangas }
        })
      )
      .catch(() =>
        this.setState({
          response: { loading: false, mangas: null }
        })
      );
  };

  toggleOffline = () => {
    db.mangas
      .where('chapters')
      .toArray()
      .then(mangas =>
        this.setState({
          response: { loading: false, mangas }
        })
      )
      .catch(() =>
        this.setState({
          response: { loading: false, mangas: null }
        })
      );
  };

  render() {
    return this.props.children(this.state.response);
  }
}
