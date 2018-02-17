import { combineReducers } from 'redux';
import { uiReducer }       from 'core/reducers/reducer-ui';
import { userReducer }       from 'core/reducers/reducer-user';
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
  ui: uiReducer,
  routing: routerReducer,
  user: userReducer
});

export default rootReducer;
