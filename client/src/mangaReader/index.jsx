import * as React from 'react'
import { Route } from 'react-router-dom'

import Show from './pages/Show'

const MangaReader = () =>
  <Route
    exact={true}
    path="/manga/:mangaId/chapter/:chapterId"
    component={Show}
  />

export default MangaReader
