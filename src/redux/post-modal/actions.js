import {
  OPEN_POST_MODAL,
  CLOSE_POST_MODAL,
} from './types';

export const openPostModal = (image, rating) => ({
  type: OPEN_POST_MODAL,
  payload: {
    image,
    rating,
  },
});

export const closePostModal = () => ({
  type: CLOSE_POST_MODAL,
});
