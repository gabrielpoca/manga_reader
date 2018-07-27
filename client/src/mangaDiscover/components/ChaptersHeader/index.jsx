import * as React from 'react';
import { H3 } from '../../../components/Heading';

const styles = require('./styles.css');

const ChaptersHeader = ({ showRead }) => {
  return (
    <div className={styles.header}>
      {showRead &&
        <div className={styles.read}>
          <H3 level="none">Read</H3>
        </div>}
      <div className={styles.chapters}>
        <H3 level="h2">Chapters</H3>
      </div>
    </div>
  );
};

export default ChaptersHeader;
