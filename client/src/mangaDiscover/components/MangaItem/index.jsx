import * as React from 'react';
import { findDOMNode } from 'react-dom';
import { Link } from 'react-router-dom';

import ImageWithFallback from '../../../components/ImageWithFallback';

const styles = require('./styles.css');

class MangaItem extends React.Component {
  state = { width: 0 };
  el = null;

  componentDidMount() {
    window.addEventListener('resize', this.updateState);
    this.updateState();
  }

  updateState = () => {
    if (!this.el) {
      return;
    }

    this.setState({
      width: findDOMNode(this.el).clientWidth,
    });
  };

  get style() {
    if (this.state.width) {
      return { height: `${this.state.width}px` };
    } else {
      return {};
    }
  }

  renderOngoing = () => {
    if (!this.props.manga.ongoingChapter) {
      return null;
    }

    return (
      <span className={styles.reading}>
        Reading on chapter {this.props.manga.ongoingChapter}
      </span>
    );
  };

  render() {
    return (
      <Link
        ref={el => (this.el = el)}
        className={styles.root}
        to={`/manga/${this.props.manga.mangaId}`}
      >
        <ImageWithFallback
          style={this.style}
          className={styles.cover}
          src={this.props.manga.cover}
          fallback="/placeholder.jpg"
        />
        <div className={styles.details}>
          <h2 className={styles.title}>{this.props.manga.name}</h2>
          {this.renderOngoing()}
        </div>
      </Link>
    );
  }
}

export default MangaItem;
