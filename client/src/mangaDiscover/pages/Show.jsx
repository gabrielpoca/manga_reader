import * as React from 'react';
import { connect } from 'react-redux';
import { RequestManga } from '../../api';

import * as manga from '../../manga';
import Layout from '../components/Layout';
import Header from '../../components/Header';
import MangaShow from '../components/MangaShow';

class Show extends React.Component {
  renderHeader() {
    return <Header withBackNavigation="/" />;
  }

  render() {
    return (
      <Layout header={this.renderHeader()}>
        <RequestManga params={{ mangaId: this.props.match.params.mangaId }}>
          {({ loading, manga, error }) => {
            if (loading) return null;

            return (
              <MangaShow
                ongoingChapter={this.props.ongoingChapter || false}
                readChapters={this.props.readChapters || []}
                manga={manga}
              />
            );
          }}
        </RequestManga>
      </Layout>
    );
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
    )
  };
};

export default connect(mapStateToProps)(Show);
