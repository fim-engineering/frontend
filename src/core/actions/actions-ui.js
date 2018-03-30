import constants from 'core/types';

/**
 * openNav - Open the side nav
 */
export function openNav() {
  return {
    type: constants.OPEN_NAV
  };
}

/**
 * closeNav - Close the side nav
 */
export function closeNav() {
  return {
    type: constants.CLOSE_NAV
  };
}

export function toggleProgressbar(payload) {
  return {
    type: constants.TOGGLE_PROGRESSBAR,
    payload
  };
}

export function toggleNotification(payload) {
  return {
    type: constants.TOGGLE_NOTIFICATION,
    payload
  };
}

export function jumpToStep(payload) {
  return {
    type: constants.JUMP_TO_STEP,
    payload
  };
}

export function changeLoadingStatus(payload) {
  return {
    type: constants.IS_LOADING,
    payload
  };
}
