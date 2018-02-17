import constants from 'core/types';

export function changeUserData(payload) {
  return {
    type: constants.CHANGE_USER_DATA,
    payload
  };
}

