import React from 'react';
import CSSModules from 'react-css-modules';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Layout from '../Layout';
import Header from '../../../components/Header';
import { H1 } from '../../../components/Heading';
import BackupTab from '../BackupTab';
import OfflineTab from '../OfflineTab';

import styles from './styles.css';

class SettingsPage extends React.Component {
  render() {
    return (
      <Layout
        header={<Header withBackNavigation="/" />}
        title={<H1>Settings</H1>}
      >
        <Tabs>
          <TabList className={styles.tabs}>
            <Tab selectedClassName={styles.tabActive} className={styles.tab}>
              Backup
            </Tab>
            <Tab selectedClassName={styles.tabActive} className={styles.tab}>
              Offline
            </Tab>
          </TabList>
          <TabPanel>
            <BackupTab />
          </TabPanel>
          <TabPanel>
            <OfflineTab />
          </TabPanel>
        </Tabs>
      </Layout>
    );
  }
}

export default CSSModules(SettingsPage, styles);
