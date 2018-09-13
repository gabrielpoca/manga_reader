import React from 'react';
import { connect } from 'react-redux';

import * as manga from '../../manga';
import Layout from '../components/Layout';
import MangaList from '../components/MangaList';
import Header from '../../components/Header';

class Page extends React.Component {
  componentDidMount() {
    this.props.request();
  }

  searchActive = () => this.props.query && this.props.query !== '';

  render() {
    return (
      <Layout header={<Header />}>
        <MangaList
          onChange={query => this.props.request({ query })}
          search={this.props.query}
          mangas={this.props.mangas}
          ongoingChapters={this.props.ongoingChapters}
        />
      </Layout>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    ongoingMangas: manga.filters.getOngoingMangas(state),
    ongoingChapters: manga.filters.getOngoingChapterByManga(state),
    mangas: manga.filters.getAllMangas(state),
    query: manga.filters.getSearchQuery(state),
  };
};

export default connect(
  mapStateToProps,
  { request: manga.actions.allMangaRequest }
)(Page);
