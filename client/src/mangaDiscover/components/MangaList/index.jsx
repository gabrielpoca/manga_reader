import * as React from 'react';
import CSSModules from 'react-css-modules';

import MangaItem from '../MangaItem';
import Search from '../../../components/Search';

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

  render() {
    const { onBlur, onChange, search } = this.props;

    return (
      <div styleName="root">
        <div styleName="search">
          <Search onBlur={onBlur} onChange={onChange} value={search} />
        </div>
        <div styleName="list">{this.props.mangas.map(this.renderManga)}</div>
      </div>
    );
  }
}

export default CSSModules(MangaList, styles);
