import * as _ from 'lodash';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { H1, H3 } from '../../../components/Heading';
import Page from '../Page';

const closeIcon = require('./close.svg');
const styles = require('./styles.css');

class ChapterReader extends React.Component {
  lastChapter = () =>
    _(this.props.manga.chapters)
      .map('chapterId')
      .map(_.parseInt)
      .max();

  lastPage = () =>
    _(this.props.chapter.pages)
      .map('pageId')
      .map(_.parseInt)
      .max();

  handleShow = pageId => {
    if (_.parseInt(pageId) === this.lastPage()) {
      this.props.onScrollToBottom();
    }
  };

  renderNext = () => {
    const chapterNr = _.parseInt(this.props.chapter.chapterId);

    if (chapterNr < this.lastChapter()) {
      return (
        <Link
          className={styles.link}
          to={`/manga/${this.props.manga.mangaId}/chapter/${chapterNr + 1}`}
        >
          Next
        </Link>
      );
    }

    return null;
  };

  renderBack = () => {
    const chapterNr = this.props.chapter.chapterId;

    if (chapterNr > 1) {
      return (
        <Link
          className={styles.link}
          to={`/manga/${this.props.manga.mangaId}/chapter/${chapterNr - 1}`}
        >
          Previous
        </Link>
      );
    } else {
      return <span />;
    }

    return null;
  };

  renderChapterName = () => {
    if (this.props.chapter.name) {
      return (
        <div className={styles.title}>
          <div className={styles.chapter}>
            Chapter {this.props.chapter.chapterId}
          </div>
          <div className={styles.chapterName}>
            <H1 level="h2">{this.props.chapter.name}</H1>
          </div>
        </div>
      );
    } else {
      return (
        <div className={styles.title}>
          <div className={styles.chapterName}>
            <H1 level="h2">Chapter {this.props.chapter.chapterId}</H1>
          </div>
        </div>
      );
    }
  };

  render() {
    const { chapter, manga } = this.props;

    return (
      <div className={styles.root}>
        <header className={styles.header}>
          <Link to={`/manga/${manga.mangaId}`} className={styles.close}>
            <div dangerouslySetInnerHTML={{ __html: closeIcon }} />
            <span className={styles.closeLabel}>Back</span>
          </Link>
          <div className={styles.name}>
            <H3 level="h1">{manga.name}</H3>
          </div>
          {this.renderChapterName()}
          <div className={styles.links}>
            {this.renderBack()}
            {this.renderNext()}
          </div>
        </header>
        {chapter.pages.map(page => (
          <Page
            src={page.src}
            id={page.pageId}
            onShow={this.handleShow}
            key={page.pageId}
          />
        ))}
        <div className={styles.links}>
          {this.renderBack()}
          {this.renderNext()}
        </div>
      </div>
    );
  }
}

export default ChapterReader;
