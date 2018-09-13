import * as React from 'react';
import CSSModules from 'react-css-modules';

import BackButton from '../BackButton';
import Menu from '../Menu';

import styles from './styles.css';

const backNavigation = props => <BackButton to={props.withBackNavigation} />;

const Header = props => {
  return (
    <header styleName="root">
      <div styleName="left">
        {props.withBackNavigation ? backNavigation(props) : <Menu />}
      </div>
      <div styleName="right" />
    </header>
  );
};

export default CSSModules(Header, styles);
