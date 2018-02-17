import constants from 'core/types';

const initialState = {
  isLoggedIn: false,
  userID: 0,
  token: ''
};

export function userReducer(state = initialState, action) {
  switch (action.type) {

  case constants.TOGGLE_NOTIFICATION:

    return {
      ...state,
      snackBarOptions : {
        ...state.snackBarOptions,
        ...action.payload
      }
    }

  default:
    return state;
  }
}