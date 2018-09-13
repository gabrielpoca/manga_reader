import * as React from 'react';
import * as styles from './styles.css';

const ButtonLink = props => {
  const { children, tag, ...remainingProps } = props;
  const Tag = tag || 'button';

  return (
    <Tag className={styles.root} {...remainingProps}>
      {children}
    </Tag>
  );
};

export default ButtonLink;
