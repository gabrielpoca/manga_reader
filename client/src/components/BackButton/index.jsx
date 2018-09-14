import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { Link } from 'react-router-dom';

import styles from './styles.css';
import icon from './icon.svg';

class Back extends Component {
  render() {
    return (
      <Link to={this.props.to} styleName="root">
        <span styleName="icon">
          <span dangerouslySetInnerHTML={{ __html: icon }} />
        </span>
      </Link>
    );
  }
}

export default CSSModules(Back, styles);
