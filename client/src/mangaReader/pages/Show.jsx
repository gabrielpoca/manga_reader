import * as React from 'react';
import { RequestChapter } from '../../api';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as manga from '../../manga';
import ChapterReader from '../components/ChapterReader';
import Loading from '../components/Loading';

class Show extends React.Component {
  componentDidMount() {
    this.markChapterReading(this.props);
  }

  componentWillReceiveProps(props) {
    this.markChapterReading(props);
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

  render() {
    return (
      <RequestChapter params={this.props.match.params}>
        {({ loading, chapter, manga, error }) => {
          if (loading || error) {
            return (
              <Loading
                manga={this.props.manga || {}}
                chapterId={this.props.match.params.chapterId}
              />
            );
          }

          return (
            <ChapterReader
              chapter={chapter}
              manga={manga}
              onScrollToBottom={this.markChapterReader}
            />
          );
        }}
      </RequestChapter>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      readingChapter: manga.actions.readingChapter,
      readChapter: manga.actions.readChapter
    },
    dispatch
  );
};

const mapStateToProps = (state, props) => {
  return {
    ongoingChapter: manga.filters.getOngoingChapter(
      state,
      props.match.params.mangaId
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Show);
