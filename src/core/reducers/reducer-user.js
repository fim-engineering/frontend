import constants from 'core/types';

const initialState = {
  isLoggedIn: false,
  userID: 0,
  token: '',
  email: ''
};

export function userReducer(state = initialState, action) {
  switch (action.type) {

  case constants.CHANGE_USER_DATA:

    return {
      ...state,
      ...action.payload
    }

  default:
    return state;
  }
}