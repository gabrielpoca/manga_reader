import * as React from 'react';
import { connect } from 'react-redux';

import * as manga from '../../manga';
import Layout from '../components/Layout';
import Header from '../../components/Header';
import MangaShow from '../components/MangaShow';

class Show extends React.Component {
  componentDidMount() {
    this.props.request(this.props.match.params.mangaId);
  }

  renderHeader() {
    return <Header withBackNavigation="/" />;
  }

  renderManga() {
    if (!this.props.manga) return null;

    return (
      <MangaShow
        ongoingChapter={this.props.ongoingChapter || false}
        readChapters={this.props.readChapters || []}
        manga={this.props.manga}
      />
    );
  }

  render() {
    return <Layout header={this.renderHeader()}>{this.renderManga()}</Layout>;
  }
}

const mapStateToProps = (state, props) => {
  return {
    readChapters: manga.filters.getReadChaptersForManga(
      state,
      props.match.params.mangaId
    ),
    ongoingChapter: manga.filters.getOngoingChapter(
      state,
      props.match.params.mangaId
    ),
    manga: manga.filters.byId(state, props.match.params.mangaId),
  };
};

export default connect(
  mapStateToProps,
  { request: manga.actions.mangaRequest }
)(Show);
