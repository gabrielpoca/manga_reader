import * as React from 'react';
import CSSModules from 'react-css-modules';

import MangaItem from '../MangaItem';
import Search from '../../../components/Search';
import { H3 } from '../../../components/Heading';

import styles from './styles.css';

class MangaList extends React.Component {
  renderWithOngoing = manga => {
    const newManga = {
      ...manga,
      ongoingChapter: this.props.ongoingChapters[manga.mangaId],
    };

    return <MangaItem key={manga.mangaId} manga={newManga} />;
  };

  renderManga = manga => {
    if (this.props.ongoingChapters[manga.mangaId]) {
      return this.renderWithOngoing(manga);
    } else {
      return <MangaItem key={manga.mangaId} manga={manga} />;
    }
  };

  renderMangas() {
    const { search, mangas } = this.props;

    if (mangas.length === 0 && search && search !== '')
      return (
        <H3 level="none">
          I cannot find anything for that query. Try to write it in a different
          way. It can also be the case that I don't have that manga.
        </H3>
      );

    return (
      <div styleName="list">{this.props.mangas.map(this.renderManga)}</div>
    );
  }

  render() {
    const { onChange, search } = this.props;

    return (
      <div styleName="root">
        <div styleName="search">
          <Search onChange={onChange} value={search} />
        </div>
        {this.renderMangas()}
      </div>
    );
  }
}

export default CSSModules(MangaList, styles);
