import axios from "axios";
import { API_BASE_URL, X_AUTH_TOKEN } from '../types';

export const APIRedeemPost = (id, payload) => new Promise((resolve, reject) => {
  axios
    .patch(`${API_BASE_URL}/post/activate/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(X_AUTH_TOKEN)}`
      }
    })
    .then(resolve)
    .catch(reject);
});