import axios from 'axios';

import {
  LOGIN,
  LOGOUT,
} from './types';

import { X_AUTH_TOKEN_ADMIN, API_BASE_URL } from '../../types';

export const initAdmin = (callback) => async (dispatch) => {
  const token = localStorage.getItem(X_AUTH_TOKEN_ADMIN);

  if (!token) {
    dispatch({
      type: LOGOUT,
    });

    callback(false);
  } else {
    const { data: user } = await axios.get(`${API_BASE_URL}/user/getProfileByToken`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: LOGIN,
      payload: {
        name: user.name,
        email: user.email,
        imageUrl: user.imageUrl,
      },
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
