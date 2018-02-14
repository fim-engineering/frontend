import { applyMiddleware, createStore } from 'redux';
import reduxThunk                       from 'redux-thunk';
import createLogger                     from 'redux-logger';
import rootReducer                      from '../reducers';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { routerMiddleware, push } from 'react-router-redux'
import { browserHistory } from 'react-router';

import history from '../browserHistory';


export default function configureStore(initialState) {
  const logger = createLogger({
    collapsed: true,
    predicate: () =>
    process.env.NODE_ENV === 'development'
  });

  const middleware = applyMiddleware(reduxThunk, routerMiddleware(history), logger);

  const store = middleware(createStore)(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
