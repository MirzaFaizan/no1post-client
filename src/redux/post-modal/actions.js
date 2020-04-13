import {
  OPEN_POST_MODAL,
  CLOSE_POST_MODAL,
} from './types';

export const openPostModal = (_id, image) => ({
  type: OPEN_POST_MODAL,
  payload: {
    _id,
    image,
  },
});

export const closePostModal = () => ({
  type: CLOSE_POST_MODAL,
});
