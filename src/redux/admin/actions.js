import axios from 'axios';

import {
  LOGIN,
  LOGOUT,
} from './types';

import { X_AUTH_TOKEN_ADMIN, API_BASE_URL, ADMIN_DATA } from '../../types';

export const initAdmin = (callback) => (dispatch) => {
  const adminData = localStorage.getItem(ADMIN_DATA);
  const token = localStorage.getItem(X_AUTH_TOKEN_ADMIN);

  if (!token || !adminData) {
    dispatch({
      type: LOGOUT,
    });

    callback(false);
  } else {
    dispatch({
      type: LOGIN,
      payload: JSON.parse(adminData),
    });

    callback(true);
  }
};

export const loginAdmin = (payload) => ({
  payload,
  type: LOGIN,
});

export const logoutAdmin = () => {
  localStorage.removeItem(X_AUTH_TOKEN_ADMIN);

  return {
    type: LOGOUT,
  };
};
