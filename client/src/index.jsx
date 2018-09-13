import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import { Provider as APIProvider } from './api';
import { store } from './store';

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');
}

ReactDOM.render(
  <Provider store={store}>
    <APIProvider>
      <App />
    </APIProvider>
  </Provider>,
  document.getElementById('root')
);
