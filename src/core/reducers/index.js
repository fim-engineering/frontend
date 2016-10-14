import { combineReducers }        from 'redux';
import { uiReducer }              from 'core/reducers/reducer-ui';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  ui   : uiReducer,
  form : formReducer
});

export default rootReducer;
