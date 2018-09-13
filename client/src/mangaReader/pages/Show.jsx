import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as manga from '../../manga';
import ChapterReader from '../components/ChapterReader';
import Loading from '../components/Loading';

class Show extends React.Component {
  componentDidMount() {
    this.markChapterReading(this.props);
    this.request(this.props);
  }

  componentWillReceiveProps(props) {
    if (props.match.params.chapterId !== this.props.match.params.chapterId) {
      this.markChapterReading(props);
      this.request(props);
    }
  }

  markChapterReading = props => {
    const { mangaId, chapterId } = props.match.params;

    if (props.ongoingChapter === chapterId) return;

    this.props.readingChapter(mangaId, chapterId);
  };

  markChapterReader = () => {
    const { mangaId, chapterId } = this.props.match.params;

    this.props.readChapter(mangaId, chapterId);
  };

  request = props => {
    const { mangaId, chapterId } = props.match.params;
    this.props.requestChapter(mangaId, chapterId);
    this.props.requestManga(mangaId);
  };

  render() {
    if (!this.props.chapter || !this.props.manga) {
      return (
        <Loading
          manga={this.props.manga || {}}
          chapterId={this.props.match.params.chapterId}
        />
      );
    }

    return (
      <ChapterReader
        chapter={this.props.chapter}
        manga={this.props.manga}
        onScrollToBottom={this.markChapterReader}
      />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      readingChapter: manga.actions.readingChapter,
      readChapter: manga.actions.readChapter,
      requestChapter: manga.actions.chapterRequest,
      requestManga: manga.actions.mangaRequest,
    },
    dispatch
  );
};

const mapStateToProps = (state, props) => {
  const { mangaId, chapterId } = props.match.params;

  return {
    ongoingChapter: manga.filters.getOngoingChapter(state, mangaId),
    chapter: manga.filters.getChapter(state, mangaId, chapterId),
    manga: manga.filters.byId(state, mangaId),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Show);
