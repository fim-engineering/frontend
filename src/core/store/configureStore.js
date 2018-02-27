import { applyMiddleware, createStore, combineReducers } from 'redux';
import reduxThunk                       from 'redux-thunk';
import createLogger                     from 'redux-logger';
import rootReducer                      from '../reducers';
import { routerMiddleware } from 'react-router-redux';

import history from '../browserHistory';

import * as storage from 'redux-storage'
import createEngine from 'redux-storage-engine-localstorage';
import filter from 'redux-storage-decorator-filter';
import debounce from 'redux-storage-decorator-debounce'


export default function configureStore(initialState) {
  /* - START - SETUP SAVE REDUX TO LOCALSTORAGE */
  // storage.reducer(combineReducers(rootReducer));
  // // const reducer = storage.reducer(combineReducers(rootReducer));
  // const prefixLocalStorage = 'fim'
  // let engine = createEngine(prefixLocalStorage);

  // const filterOptions = [
  //   'whitelisted-key',
  //   ['user']
  // ]

  // engine = filter(engine, filterOptions);
  // engine = debounce(engine, 10);
  // const middlewareStorage = storage.createMiddleware(engine);
  /* - END - SETUP SAVE REDUX TO LOCALSTORAGE */


  const DEV = process.env.NODE_ENV !== 'production';
  const logger = createLogger({
    collapsed: true,
    predicate: () =>
    process.env.NODE_ENV === 'development'
  });

  const middleware = applyMiddleware(reduxThunk, routerMiddleware(history), logger);

  const store = middleware(createStore)(
    rootReducer,
    DEV && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    initialState);

  // const load = storage.createLoader(engine);

  // /* - START - SETUP LOAD REDUX FROM LOCALSTORAGE */
  // const cachedStore = typeof window !== 'undefined'
  //   ? !!localStorage.getItem(prefixLocalStorage)
  //   : false;

  // if (cachedStore) {
  //   load(store)
  // }
  /* - END - SETUP LOAD REDUX FROM LOCALSTORAGE */

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
