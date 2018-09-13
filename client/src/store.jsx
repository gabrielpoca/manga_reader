import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
//import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './sagas';
import { reducer as manga } from './manga';
import { reducer as notifications } from './notifications';
import cacheMiddleware from './api/middleware';

const sagaMiddleware = createSagaMiddleware();

//const reducers = persistCombineReducers(
//{ key: 'root', storage },
//{ manga, notifications }
//);
const reducers = combineReducers({ manga, notifications });

const composeWithMiddleware = composeWithDevTools(
  applyMiddleware(sagaMiddleware, cacheMiddleware)
);

export const store = composeWithMiddleware(createStore)(reducers);
//export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
