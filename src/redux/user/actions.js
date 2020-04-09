import axios from 'axios';
import {
  LOGIN_USER,
  LOGOUT_USER,
  // REGISTER_USER,
} from './types';

// import { USER } from '../../types/user';
import { API_BASE_URL, X_AUTH_TOKEN } from '../../types';

export const logoutUser = () => (dispatch) => {
  dispatch({
    type: LOGOUT_USER,
  });
};

export const initUser = () => async (dispatch) => {
  const token = localStorage.getItem(X_AUTH_TOKEN);

  if (!token) {
    dispatch(logoutUser());
  } else {
    try {
      const { data: user } = await axios.get(`${API_BASE_URL}/user/getProfileByToken`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (user) {
        dispatch({
          type: LOGIN_USER,
          payload: {
            name: user.name,
            email: user.email,
            imageUrl: user.imageUrl,
          },
        });
      } else {
        dispatch(logoutUser());
      }
    } catch (error) {
      console.log(error);
      dispatch(logoutUser());
    }
  }
};

export const loginUser = (email, password, callback) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${API_BASE_URL}/signin`, {
      email,
      password,
    });

    localStorage.setItem(X_AUTH_TOKEN, data.token);

    dispatch({
      type: LOGIN_USER,
      payload: {
        name: data.name,
        email: data.email,
        imageUrl: data.imageUrl,
      },
    });

    if (callback) {
      callback(true);
    }
  } catch (error) {
    if (callback) {
      let errorMessage = '';

      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }

      callback(false, errorMessage);
    }
  }
};

export const registerUser = (name, email, password, avatar, callback) => async () => {
  try {
    const formData = new FormData();

    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('imageUrl', avatar);

    await axios.post(`${API_BASE_URL}/signup`, formData);

    if (callback) {
      callback(true);
    }
  } catch (error) {
    if (callback) {
      let errorMessage = '';

      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }

      callback(false, errorMessage);
    }
  }
};
