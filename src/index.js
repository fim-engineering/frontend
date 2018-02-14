import React          from 'react';
import ReactDOM       from 'react-dom';
import { Provider }   from 'react-redux';
import configureStore from 'core/store/configureStore';
import App            from 'containers/App';
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import history1 from './core/browserHistory.js';


const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App history={history1}/>
  </Provider>,
  document.getElementById('root')
);