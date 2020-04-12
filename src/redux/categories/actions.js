import axios from 'axios';
import {
  ADD_CATEGORY,
  EDIT_CATEGORY,
  INIT_CATEGORIES,
  REMOVE_CATEGORY,
  CLEAR_CATEGORIES,
} from './types';

import { API_BASE_URL, X_AUTH_TOKEN, X_AUTH_TOKEN_ADMIN } from '../../types';

export const addCategory = (category, icon, callback) => async (dispatch) => {
  const token = localStorage.getItem(X_AUTH_TOKEN_ADMIN);

  try {
    if (!token) {
      // No Token, Do NothinG
    } else {
      const { data } = await axios.post(`${API_BASE_URL}/category/add`, {
        icon,
        category,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({
        type: ADD_CATEGORY,
        payload: data.savedCategory,
      });

      callback(true);
    }
  } catch (error) {
    callback(false);
  }
};

export const addCategories = (categories = []) => ({
  type: ADD_CATEGORY,
  payload: categories,
});

export const editCategory = (id, category, icon, callback) => async (dispatch) => {
  const token = localStorage.getItem(X_AUTH_TOKEN_ADMIN);

  try {
    if (!token) {
      // Do NothinG
    } else {
      await axios.put(`${API_BASE_URL}/category/update/${id}`, {
        icon,
        category,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({
        type: EDIT_CATEGORY,
        payload: {
          id,
          category: {
            icon,
            category,
          },
        },
      });

      callback(true);
    }
  } catch (error) {
    callback(false);
  }
};

export const initCategories = () => async (dispatch) => {
  const token = localStorage.getItem(X_AUTH_TOKEN_ADMIN);

  try {
    const { data } = await axios.get(`${API_BASE_URL}/category/getAllCategory`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    dispatch({
      type: INIT_CATEGORIES,
      payload: data,
    });
  } catch (error) {
    // error
  }
};

export const removeCategory = (id) => async (dispatch) => {
  const token = localStorage.getItem(X_AUTH_TOKEN_ADMIN);

  try {
    if (!token) {
      // Do NothinG
    } else {
      await axios.delete(`${API_BASE_URL}/category/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({
        type: REMOVE_CATEGORY,
        payload: id,
      });
    }
  } catch (error) {
    // error
  }
};

export const clearCategories = () => ({
  type: CLEAR_CATEGORIES,
});
