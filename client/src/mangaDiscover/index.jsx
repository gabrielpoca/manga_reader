import * as React from 'react'
import { Route, Switch } from 'react-router-dom'

import List from './pages/List'
import Show from './pages/Show'

const MangaDiscover = () =>
  <Switch>
    <Route exact={true} path="/manga/:mangaId" component={Show} />
    <Route path="/:query?" component={List} />
  </Switch>

export default MangaDiscover
