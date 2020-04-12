import axios from 'axios';
import { UPDATE_RATE, LOADING_RATE } from './types';
import { API_BASE_URL, X_AUTH_TOKEN } from '../../types';

export const updateRate = (callback) => async (dispatch) => {
  const token = localStorage.getItem(X_AUTH_TOKEN);

  try {
    dispatch({
      type: LOADING_RATE,
    });

    axios
      .get(`${API_BASE_URL}/post/getPostRate`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        dispatch({
          type: UPDATE_RATE,
          payload: response.data.currentPostRate,
        });

        if (callback)
          callback(true);
      })
      .catch((error) => {
        if (callback)
          callback(false);
        
        console.log(error);
      })
  } catch (error) {
    console.log(error);
  }
};

export const setRateLoading = () => ({ type: LOADING_RATE });
