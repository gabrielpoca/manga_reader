import React from 'react';
import { connect } from 'react-redux';
import { filter, sortBy, includes } from 'lodash';

import * as manga from '../../manga';
import Search from '../containers/Search';
import Layout from '../components/Layout';
import MangaList from '../components/MangaList';
import EmptyMangaList from '../components/EmptyMangaList';
import Header from '../../components/Header';

class Page extends React.Component {
  constructor() {
    super();

    this.state = {
      suspendLoadingRender: true,
    };
  }

  componentDidMount() {
    this.props.request();

    this.timer = setTimeout(
      () => this.setState({ suspendLoadingRender: false }),
      250
    );
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  sortMangas = mangas => {
    return sortBy(
      mangas,
      manga => (includes(this.props.ongoingMangas, manga.mangaId) ? 0 : 1)
    );
  };

  limitMangas = mangas => {
    return mangas.slice(0, 40);
  };

  getMangasFromData = searchQuery => {
    if (!!searchQuery) {
      const newMangas = filter(
        this.props.mangas,
        manga =>
          manga.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
      );

      return this.limitMangas(this.sortMangas(newMangas));
    } else {
      return this.limitMangas(this.sortMangas(this.props.mangas));
    }
  };

  renderMangas({ active, query, onSearch, onBlur }) {
    if (this.props.mangas.length > 0) {
      return (
        <MangaList
          onChange={onSearch}
          onBlur={onBlur}
          search={query}
          mangas={this.getMangasFromData(query)}
          ongoingChapters={this.props.ongoingChapters}
        />
      );
    }

    if (!this.state.suspendLoadingRender) {
      return <EmptyMangaList hasQuery={active} />;
    }

    return null;
  }

  render() {
    return (
      <Search {...this.props}>
        {({ active, query, onSearch, onBlur }) => (
          <Layout header={<Header />}>
            {this.renderMangas({ active, query, onSearch, onBlur })}
          </Layout>
        )}
      </Search>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    ongoingMangas: manga.filters.getOngoingMangas(state),
    ongoingChapters: manga.filters.getOngoingChapterByManga(state),
    mangas: manga.filters.getAllMangas(state),
  };
};

export default connect(
  mapStateToProps,
  { request: manga.actions.allMangaRequest }
)(Page);
