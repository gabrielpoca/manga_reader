import React, { Component } from 'react';
import CSSModules from 'react-css-modules';

import Button from '../../../components/Button';
import FileButton from '../FileButton';

import styles from './styles.css';

class BackupTab extends Component {
  render() {
    return (
      <React.Fragment>
        <p styleName="info">
          If you create an account, your progress will be sync between devices,
          so you can start reading in one device and continue on another.
        </p>
        <p styleName="info">
          If you do not want to create an account, you can make a file backup.
          If you have a backup you can restore it.
        </p>
        <div styleName="button">
          <Button onClick={this.props.onBackup}>Make Backup</Button>
        </div>
        <div styleName="button">
          <FileButton onChange={this.props.onRestore} />
        </div>
      </React.Fragment>
    );
  }
}

export default CSSModules(BackupTab, styles);
