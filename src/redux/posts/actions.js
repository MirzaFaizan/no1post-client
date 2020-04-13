import axios from 'axios';

import {
  ADD_POST,
  ADD_REPLY,
  INIT_POSTS,
  ADD_COMMENT,
  REMOVE_POST,
  REMOVE_COMMENT,
  REMOVE_REPLY,
  RATE_POST,
} from './types';

import {
  API_BASE_URL,
  X_AUTH_TOKEN,
  X_AUTH_TOKEN_ADMIN,
} from '../../types';

import { updateRate, setRateLoading } from '../post-rate/actions';

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

export const addPost = (stripeToken, postRate, file, fileType, description, category, callback) => async (dispatch) => {
  try {
    const formData = new FormData();

    const token = localStorage.getItem(X_AUTH_TOKEN);

    formData.append('stripeToken', stripeToken);
    formData.append('postRate', postRate * 100);
    formData.append('mediaUrl', file);
    formData.append('category', category);
    formData.append('mediaType', fileType);
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

    dispatch(setRateLoading());
    dispatch(updateRate());
  } catch (error) {
    console.log(error.response);

    if (callback) {
      callback(false, error);
    }
  }
};

export const adminAddPost = (description, category, file, fileType) => async (dispatch) => {
  const token = localStorage.getItem(X_AUTH_TOKEN_ADMIN);

  const formData = new FormData();

  formData.append('mediaUrl', file);
  formData.append('mediaType', fileType);
  formData.append('category', category);
  formData.append('description', description);

  try {
    const { data } = await axios.post(`${API_BASE_URL}/admin/post/add`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: ADD_POST,
      payload: data.savedArticle,
    });
  } catch (error) {
    console.log(error);
  }
};

export const removePost = (postId) => async (dispatch) => {
  const token = localStorage.getItem(X_AUTH_TOKEN_ADMIN);

  try {
    if (!token) {
      // do nothing
    } else {
      await axios.delete(`${API_BASE_URL}/admin/post/delete/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({
        type: REMOVE_POST,
        payload: postId,
      });
    }
  } catch (error) {
    console.log(error.response);
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
          userId: savedComment.userId,
        },
      },
    });
  } catch (error) {
    // console.error(error);
  }
};

export const removeComment = (postId, commentId) => async (dispatch) => {
  const token = localStorage.getItem(X_AUTH_TOKEN);

  try {
    await axios.delete(`${API_BASE_URL}/comment/delete/${commentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: REMOVE_COMMENT,
      payload: {
        postId,
        commentId,
      },
    });

  } catch (error) {
    console.log(error);
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

export const removeReply = (postId, commentId, replyId) => async (dispatch) => {
  const token = localStorage.getItem(X_AUTH_TOKEN);

  try {
    await axios({
      method: 'DELETE',
      url: `${API_BASE_URL}/comment/reply/${replyId}`,
      data: {
        replyId,
        commentId,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    dispatch({
      type: REMOVE_REPLY,
      payload: {
        postId,
        replyId,
        commentId,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const ratePost = (postId, rating) => async (dispatch) => {
  const token = localStorage.getItem(X_AUTH_TOKEN);

  try {
    const { data } = await axios.patch(`${API_BASE_URL}/rating/add`, {
      resourceId: postId,
      ratingPoints: rating * 20,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: RATE_POST,
      payload: {
        postId,
        rating: data.newlyAddedRating,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
