import React from 'react';

import Manga from '../query/manga';

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

    this.subscribe(mangaId);
  }

  componentWillReceiveProps(props) {
    if (props.params === this.props.params) return;

    this.unsubscribe(this.props.params.mangaId);
    this.subscribe(props.params.mangaId);
  }

  componentWillUnmount() {
    const { mangaId } = this.props.params;
    this.unsubscribe(mangaId);
  }

  subscribe(mangaId) {
    Manga.subscribe(mangaId, this.handleUpdate);
  }

  unsubscribe(mangaId) {
    Manga.unsubscribe(mangaId, this.handleUpdate);
  }

  handleUpdate = ({ detail }) => {
    this.setState({ manga: detail.manga, loading: false, error: null });
  };

  render() {
    return this.props.children(this.state);
  }
}
