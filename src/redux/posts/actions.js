import axios from 'axios';
import { v4 } from 'uuid';

import {
  ADD_POST,
  ADD_REPLY,
  INIT_POSTS,
  ADD_COMMENT,
  // REMOVE_COMMENT,
} from './types';

import {
  API_BASE_URL,
  X_AUTH_TOKEN,
} from '../../types';

export const initPosts = (callback) => async (dispatch) => {
  const token = localStorage.getItem(X_AUTH_TOKEN);

  try {
    if (!token) {
      // Do NothinG
    } else {
      const { data } = await axios.get(`${API_BASE_URL}/post/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({
        type: INIT_POSTS,
        payload: data.article,
      });

      if (callback) {
        callback(true);
      }
    }
  } catch (error) {
    // console.error(error);
  }
};

export const addPost = (file, description, category, callback) => async (dispatch) => {
  try {
    const formData = new FormData();

    const token = localStorage.getItem(X_AUTH_TOKEN);

    formData.append('mediaUrl', file);
    formData.append('category', category);
    formData.append('description', description);

    const { data } = await axios.post(`${API_BASE_URL}/post/add`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: ADD_POST,
      payload: data.savedArticle,
    });

    if (callback) {
      callback(true);
    }
  } catch (error) {
    if (callback) {
      callback(false, error);
    }
  }
};

export const addComment = (postId, comment) => async (dispatch) => {
  const token = localStorage.getItem(X_AUTH_TOKEN);

  try {
    const { data } = await axios.post(`${API_BASE_URL}/comment/add`, {
      text: comment,
      resourceId: postId,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { savedComment } = data;

    dispatch({
      type: ADD_COMMENT,
      payload: {
        postId,
        comment: {
          replies: [],
          _id: savedComment._id,
          text: savedComment.text,
          user: savedComment.userId,
        },
      },
    });
  } catch (error) {
    // console.error(error);
  }
};

export const addReply = (postId, commentId, reply, callback) => async (dispatch) => {
  const token = localStorage.getItem(X_AUTH_TOKEN);

  try {
    const { data } = await axios.patch(`${API_BASE_URL}/comment/reply/add`, {
      commentId,
      text: reply,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    data._id = data._id._id;

    dispatch({
      type: ADD_REPLY,
      payload: {
        postId,
        commentId,
        reply: data,
      },
    });

    callback(true);
  } catch (error) {
    callback(false);
    console.error(error.response);
  }
};

// export const removeReply = (postId, commentId, replyId) => async (dispatch) => {
//   try {

//   } catch (error) {
//     console.error(error);
//   }
// };
