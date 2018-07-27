import * as React from 'react';
import CSSModules from 'react-css-modules';

import MangaItem from '../MangaItem';

import styles from './styles.css';

class MangaList extends React.Component {
  render() {
    return (
      <div className={styles.list}>
        {this.props.mangas.map(manga => (
          <MangaItem key={manga.mangaId} manga={manga} />
        ))}
      </div>
    );
  }
}

export default CSSModules(MangaList, styles);
