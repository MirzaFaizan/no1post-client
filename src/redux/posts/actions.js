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
  // X_AUTH_TOKEN,
} from '../../types';

export const initPosts = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/posts`);

    dispatch({
      type: INIT_POSTS,
      payload: data,
    });
  } catch (error) {
    // console.error(error);
  }
};

export const addPost = (file, description) => async (dispatch) => {
  try {
    const { data: users } = await axios.get(`${API_BASE_URL}/users`);

    const formData = new FormData();

    // const token = localStorage.getItem(X_AUTH_TOKEN);

    formData.append('file', file);
    formData.append('description', description);

    // const { data } = await axios.post(`${API_BASE_URL}/posts`, formData, {
    //   bearer: token,
    // });

    dispatch({
      type: ADD_POST,
      payload: {
        _id: v4(),
        rating: 5,
        user: users[1],
        text: description,
        mediaUrl: window.URL.createObjectURL(file),
        mediaType: 'audio',
        comments: [],
      },
    });
  } catch (error) {
    // console.error(error);
  }
};

export const addComment = (postId, comment) => async (dispatch) => {
  try {
    const { data: users } = await axios.get(`${API_BASE_URL}/users`);
    // const { data } = await axios.post(`${API_BASE_URL}/posts/${postId}/comments`);

    dispatch({
      type: ADD_COMMENT,
      payload: {
        postId,
        comment: {
          _id: v4(),
          replies: [],
          text: comment,
          user: { ...users[0] },
        },
      },
    });
  } catch (error) {
    // console.error(error);
  }
};

export const addReply = (postId, commentId, reply) => async (dispatch) => {
  try {
    const { data: users } = await axios.get(`${API_BASE_URL}/users`);

    dispatch({
      type: ADD_REPLY,
      payload: {
        postId,
        commentId,
        reply: {
          _id: v4(),
          text: reply,
          user: { ...users[1] },
        },
      },
    });
  } catch (error) {
    // console.error(error);
  }
};

// export const removeReply = (postId, commentId, replyId) => async (dispatch) => {
//   try {

//   } catch (error) {
//     console.error(error);
//   }
// };
