import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { Link } from 'react-router-dom';

import { H2 } from '../../../components/Heading';
import UsageQuota from '../../containers/UsageQuota';

import styles from './styles.css';

class OfflineTab extends Component {
  renderUsage() {
    return (
      <UsageQuota>
        {({ percentage }) => {
          if (percentage === null) return null;

          return (
            <div className={styles.info}>
              This application is using {percentage}% of its available space.
              The browser controls the available space, and the amount changes
              over time.
            </div>
          );
        }}
      </UsageQuota>
    );
  }

  render() {
    return (
      <React.Fragment>
        <p styleName="info">
          I am not collecting personal or usage information. Your progress is
          saved in this browser.
        </p>
        <p styleName="info">
          You can make a file backup that you can restore later.
        </p>
        <p styleName="info">
          Before you clear the browser, make sure you create a back-up,
          otherwise you will lose your progress.
        </p>
        <div styleName="heading">
          <H2>Device space</H2>
        </div>
        {this.renderUsage()}
      </React.Fragment>
    );
  }
}

export default CSSModules(OfflineTab, styles);
