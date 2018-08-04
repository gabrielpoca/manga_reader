import React from 'react';

import db from '../database';
import { get } from '../query/mangas';

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

    get()
      .then(response => db.mangas.bulkAdd(response.mangas))
      .then(this.updateData)
      .catch(err => console.log(err));
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
      .then(mangas => {
        this.setState({
          response: { loading: false, mangas }
        });
      })
      .catch(() =>
        this.setState({
          response: { loading: false, mangas: null }
        })
      );
  };

  toggleOffline = async () => {
    try {
      const mangas = await db.mangas
        .filter(m => m.chapters && m.chapters.length > 0)
        .toArray();

      this.setState({
        response: { loading: false, mangas }
      });
    } catch (err) {
      this.setState({
        response: { loading: false, mangas: null }
      });
    }
  };

  render() {
    return this.props.children(this.state.response);
  }
}
