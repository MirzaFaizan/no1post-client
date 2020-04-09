import axios from 'axios';

import {
  LOGIN,
  LOGOUT,
} from './types';

import { X_AUTH_TOKEN_ADMIN, API_BASE_URL } from '../../types';

export const initAdmin = () => (dispatch) => {
  const token = localStorage.getItem(X_AUTH_TOKEN_ADMIN);

  if (!token) {
    dispatch({
      type: LOGOUT,
    });
  } else {
    axios
      .get(`${API_BASE_URL}/user/`)
      .then((response) => response.data)
      .then((data) => {
        dispatch({
          type: LOGIN,
          payload: {
            name: data.name,
            email: data.email,
            userType: data.userType,
          },
        });
      })
      .catch(() => {
        dispatch({
          type: LOGOUT,
        });
      });
  }
};

export const loginAdmin = (payload) => ({
  payload,
  type: LOGIN,
});

export const logoutAdmin = () => ({
  type: LOGOUT,
});
