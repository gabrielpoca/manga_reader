import React from 'react';
import { Link } from 'react-router-dom';

import { H3 } from '../../../components/Heading';

const closeIcon = require('./close.svg');
const styles = require('./styles.css');

class Header extends React.Component {
  constructor() {
    super();
    this.lastScrollTop = 0;
    this.state = { open: true };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, { passive: true });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > this.lastScrollTop && scrollTop > 400) {
      this.setState({ open: false });
    } else {
      this.setState({ open: true });
    }

    this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  };

  rootClasses() {
    if (this.state.open) {
      return styles.root;
    } else {
      return `${styles.root} ${styles.up}`;
    }
  }

  render() {
    const { manga, chapter } = this.props;

    return (
      <header className={this.rootClasses()}>
        <H3 level="h1">Chapter {chapter.chapterId}</H3>
        <Link to={`/manga/${manga.mangaId}`} className={styles.close}>
          <div dangerouslySetInnerHTML={{ __html: closeIcon }} />
          <span className={styles.closeLabel}>Back</span>
        </Link>
      </header>
    );
  }
}

export default Header;
