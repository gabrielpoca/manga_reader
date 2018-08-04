import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import promiseMiddleware from 'redux-promise-middleware';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';

import { reducer as manga } from './manga';
import { reducer as notifications } from './notifications';
import cacheMiddleware from './api/middleware';

const reducers = persistCombineReducers(
  { key: 'root', storage },
  { manga, notifications }
);

const composeWithMiddleware = composeWithDevTools(
  applyMiddleware(thunk, promiseMiddleware(), cacheMiddleware)
);

export const store = composeWithMiddleware(createStore)(reducers);
export const persistor = persistStore(store);
