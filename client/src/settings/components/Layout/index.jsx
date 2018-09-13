import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './styles.css';

class Layout extends React.PureComponent {
  render() {
    return (
      <div styleName="root">
        <div styleName="header">{this.props.header}</div>
        <div styleName="content">
          <div styleName="title">{this.props.title}</div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default CSSModules(Layout, styles);
