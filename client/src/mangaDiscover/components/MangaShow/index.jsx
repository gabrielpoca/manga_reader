import * as React from 'react';
import CSSModules from 'react-css-modules';
import { Link } from 'react-router-dom';
import { isArray } from 'lodash';
import _ from 'lodash';

import ChapterItem from '../ChapterItem';
import Cover from '../Cover';
import Button from '../../../components/Button';
import ChaptersHeader from '../ChaptersHeader';
import { H1 } from '../../../components/Heading';

import styles from './styles.css';

class MangaShow extends React.Component {
  get hasReadChapters() {
    return this.props.readChapters.length > 0;
  }

  renderButton = () => {
    const { manga, ongoingChapter } = this.props;

    if (!ongoingChapter) {
      return (
        <Button
          tag={Link}
          to={`/manga/${manga.mangaId}/chapter/${_.get(
            manga,
            'chapters.0.chapterId'
          )}`}
        >
          Read
        </Button>
      );
    } else {
      return (
        <Button
          tag={Link}
          to={`/manga/${manga.mangaId}/chapter/${ongoingChapter}`}
        >
          Chapter {ongoingChapter}
        </Button>
      );
    }
  };

  renderChapters() {
    const { manga, readChapters } = this.props;
    const { chapters } = manga;

    if (!isArray(chapters)) {
      return;
    }

    if (chapters.length === 0) {
      return (
        <div className={styles.chapters}>
          <p>
            We cannot find any chapters for this manga. Please try again in a
            while.
          </p>
        </div>
      );
    } else {
      return (
        <div className={styles.chapters}>
          <ChaptersHeader showRead={this.hasReadChapters} />
          {chapters.map((chapter, index) => (
            <ChapterItem
              showRead={this.hasReadChapters}
              read={
                readChapters.indexOf(parseInt(chapter.chapterId, 10)) !== -1
              }
              key={chapter.chapterId}
              chapter={chapter}
            />
          ))}
        </div>
      );
    }
  }

  render() {
    const { manga } = this.props;
    const { name, cover } = manga;

    return (
      <div className="root">
        <div className={styles.image}>
          <Cover cover={cover} />
        </div>
        <div className={styles.details}>
          <div className={styles.title}>
            <H1 level="h1">{name}</H1>
          </div>
          {this.renderButton()}
        </div>
        {this.renderChapters()}
      </div>
    );
  }
}

export default CSSModules(MangaShow, styles);
