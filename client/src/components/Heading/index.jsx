import { omit } from 'lodash';
import * as React from 'react';
import * as styles from './styles.css';

const Heading = props => {
  const childProps = omit(props, 'level');
  switch (props.level) {
    case 'h1':
      return <h1 {...childProps} />;
    case 'h2':
      return <h2 {...childProps} />;
    case 'h3':
      return <h3 {...childProps} />;
    case 'h4':
      return <h4 {...childProps} />;
    case 'none':
      return <span {...childProps} />;
    default:
      return <h1 {...childProps} />;
  }
};

export const H1 = props => {
  return <Heading className={styles.root} {...props} />;
};

export const H2 = props => {
  const classes = [styles.root, styles.h2].join(' ');
  return <Heading className={classes} {...props} />;
};

export const H3 = props => {
  const classes = [styles.root, styles.h3].join(' ');
  return <Heading className={classes} {...props} />;
};

export const H4 = props => {
  const classes = [styles.root, styles.h4].join(' ');
  return <Heading className={classes} {...props} />;
};
