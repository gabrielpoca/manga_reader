import React from 'react';
import { connect } from 'react-redux';
import { filter, sortBy, includes } from 'lodash';
import { RequestMangas } from '../../api';

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
      suspendLoadingRender: true
    };
  }

  componentDidMount() {
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

  getMangasFromData = (mangas, searchQuery) => {
    if (!!searchQuery) {
      const newMangas = filter(
        mangas,
        manga =>
          manga.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
      );

      return this.limitMangas(this.sortMangas(newMangas));
    } else {
      return this.limitMangas(this.sortMangas(mangas));
    }
  };

  renderHeader({ onBlur, onSearch, query }) {
    return <Header onChange={onSearch} onBlur={onBlur} search={query} />;
  }

  render() {
    return (
      <Search {...this.props}>
        {({ active, query, onSearch, onBlur }) => (
          <Layout header={this.renderHeader({ onBlur, onSearch, query })}>
            <RequestMangas>
              {({ mangas, loading }) => {
                if (!loading) {
                  return (
                    <MangaList mangas={this.getMangasFromData(mangas, query)} />
                  );
                }

                if (loading && !this.state.suspendLoadingRender) {
                  return <EmptyMangaList hasQuery={active} />;
                }

                return null;
              }}
            </RequestMangas>
          </Layout>
        )}
      </Search>
    );
  }
}

const mapStateToProps = (state, props) => {
  return { ongoingMangas: manga.filters.getOngoingMangas(state) };
};

export default connect(mapStateToProps)(Page);
