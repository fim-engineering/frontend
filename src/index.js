import React          from 'react';
import ReactDOM       from 'react-dom';
import { Provider }   from 'react-redux';
import configureStore from 'core/store/configureStore';
import App            from 'containers/App';
import history1 from './core/browserHistory.js';
import Raven from 'raven-js';
Raven.config('https://05b0d00bc32b40d5b31031e2e4afb931@sentry.io/289884').install()

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App history={history1}/>
  </Provider>,
  document.getElementById('root')
);