import { combineReducers } from 'redux';
import { uiReducer }       from 'core/reducers/reducer-ui';
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
  ui: uiReducer,
  routing: routerReducer
});

export default rootReducer;
