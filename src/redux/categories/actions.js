import axios from 'axios';
import {
  ADD_CATEGORY,
  EDIT_CATEGORY,
  INIT_CATEGORIES,
  REMOVE_CATEGORY,
  CLEAR_CATEGORIES,
} from './types';

import { API_BASE_URL, X_AUTH_TOKEN } from '../../types';

export const addCategory = (category, image, callback) => async (dispatch) => {
  const token = localStorage.getItem(X_AUTH_TOKEN);

  try {
    if (!token) {
      // No Token, Do NothinG
    } else {
      const formData = new FormData();

      formData.append('imageUrl', image);
      formData.append('category', category);

      const { data } = await axios.post(`${API_BASE_URL}/category/add`, formData, {
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

export const editCategory = (id, category, image, callback) => async (dispatch) => {
  const token = localStorage.getItem(X_AUTH_TOKEN);

  try {
    if (!token) {
      // Do NothinG
    } else {
      const formData = new FormData();

      formData.append('imageUrl', image);
      formData.append('category', category);

      await axios.put(`${API_BASE_URL}/category/update/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({
        type: EDIT_CATEGORY,
        payload: {
          id,
          category: {
            category,
            imageUrl: `https://postno1.s3.amazonaws.com/${image.name}`,
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
  try {
    const { data } = await axios.get(`${API_BASE_URL}/category/getAllCategory`);

    dispatch({
      type: INIT_CATEGORIES,
      payload: data,
    });
  } catch (error) {
    // error
  }
};

export const removeCategory = (id) => async (dispatch) => {
  const token = localStorage.getItem(X_AUTH_TOKEN);

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
