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

export const addPost = (file, fileType, description, category, callback) => async (dispatch) => {
  try {
    const formData = new FormData();

    const token = localStorage.getItem(X_AUTH_TOKEN);

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
    if (callback) {
      callback(false, error);
    }
  }
};

export const removePost = (postId) => async (dispatch) => {
  const token = localStorage.getItem(X_AUTH_TOKEN);

  try {
    if (!token) {
      // do nothing
    } else {
      // const { data } = await axios.delete(`${API_BASE_URL}/post/remove`, {
      //   headers: {
      //     Authorization: token,
      //   },
      // });

      // console.log(data);

      dispatch({
        type: REMOVE_POST,
        payload: postId,
      });
    }
  } catch (error) {
    console.log(error);
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
    // const { data } = await axios.delete(`${API_BASE_URL}/comment/remove`, {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // });

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
    dispatch({
      type: RATE_POST,
      payload: {
        postId,
        rating,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
