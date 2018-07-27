import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';

import App from './App';
import { Provider as APIProvider } from './api';
import { store, persistor } from './store';

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');
}

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <APIProvider>
        <App />
      </APIProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
