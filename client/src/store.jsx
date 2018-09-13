import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './sagas';
import { reducer as manga } from './manga';
import { reducer as notifications } from './notifications';
import cacheMiddleware from './core/middleware';

const sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers({ manga, notifications });

const composeWithMiddleware = composeWithDevTools(
  applyMiddleware(sagaMiddleware, cacheMiddleware)
);

export const store = composeWithMiddleware(createStore)(reducers);

sagaMiddleware.run(rootSaga);
