import * as React from 'react'
import { Route } from 'react-router-dom'

import Show from './pages/Show'

const Settings = () => <Route exact={true} path="/settings" component={Show} />

export default Settings
