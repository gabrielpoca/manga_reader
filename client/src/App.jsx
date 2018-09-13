import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import ScrollToTop from './components/ScrollToTop';
import MangaDiscover from './mangaDiscover';
import MangaReader from './mangaReader';
import Settings from './settings';
import TermsOfUse from './terms_of_use';
import { Notifications } from './notifications';

import './styles.css';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div style={{ height: '100%' }}>
          <Notifications />
          <ScrollToTop />
          <Switch>
            <Route path="/settings" component={Settings} />
            <Route path="/terms" component={TermsOfUse} />
            <Route
              path="/manga/:mangaId/chapter/:chapterId"
              component={MangaReader}
            />
            <Route path="/" component={MangaDiscover} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
