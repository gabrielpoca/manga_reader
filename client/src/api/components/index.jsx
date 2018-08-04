import React from 'react';

import Mangas from './mangas';
import Manga from './manga';
import Chapter from './chapter';
import Context from '../context';

const withContext = Component => {
  class WrappedComponent extends React.Component {
    render() {
      return (
        <Context.Consumer>
          {context => (
            <Component {...this.props} {...context}>
              {this.props.children}
            </Component>
          )}
        </Context.Consumer>
      );
    }
  }

  return WrappedComponent;
};

const MangasWithContext = withContext(Mangas);
const MangaWithContext = withContext(Manga);
const ChapterWithContext = withContext(Chapter);

export {
  MangasWithContext as RequestMangas,
  MangaWithContext as RequestManga,
  ChapterWithContext as RequestChapter
};
