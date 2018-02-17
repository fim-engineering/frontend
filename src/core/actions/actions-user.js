import constants from 'core/types';

export function changeUserData(payload) {
  return {
    type: constants.CHANGE_USER_DATA,
    payload
  };
}

export function resetUserData(payload) {
  return {
    type: constants.RESET_USER_DATA,
    payload
  };
}

