import constants from 'core/types';

const initialState = {
  leftNavOpen: false,
  isRunProgressBar: false,
  snackBarOptions: {
    isOpen: false,
    text: '',
    autoHideDuration: 1000
  },
  stepIndex: 0,
};

export function uiReducer(state = initialState, action) {
  switch (action.type) {

  case constants.OPEN_NAV:
    return Object.assign({}, state, {
      leftNavOpen: true
    });

  case constants.CLOSE_NAV:
    return Object.assign({}, state, {
      leftNavOpen: false
    });
  
  case constants.TOGGLE_PROGRESSBAR:
    return Object.assign({}, state, {
      isRunProgressBar: action.payload
    });

  case constants.TOGGLE_NOTIFICATION:

    return {
      ...state,
      snackBarOptions : {
        ...state.snackBarOptions,
        ...action.payload
      }
    }

  case constants.JUMP_TO_STEP:
      return Object.assign({}, state, { stepIndex: action.payload });

  default:
    return state;
  }
}
