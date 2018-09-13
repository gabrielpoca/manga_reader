import { fork } from 'redux-saga/effects';

import mangaSagas from './manga/sagas';

export default function* root() {
  yield fork(mangaSagas);
}
