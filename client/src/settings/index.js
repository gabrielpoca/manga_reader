import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Show from './pages/Show';

const Settings = ({ match }) => (
  <Switch>
    <Route path={`${match.path}`} component={Show} />
  </Switch>
);

export default Settings;
