import {
  OPEN_AUTH_MODAL,
  CLOSE_AUTH_MODAL,
  CHANGE_VIEW_AUTH_MODAL,
} from './types';

export const openAuthModal = () => ({
  type: OPEN_AUTH_MODAL,
});

export const closeAuthModal = () => ({
  type: CLOSE_AUTH_MODAL,
});

export const changeView = (view = '') => ({
  type: CHANGE_VIEW_AUTH_MODAL,
  payload: view,
});
