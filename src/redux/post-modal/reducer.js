import {
  OPEN_POST_MODAL,
  CLOSE_POST_MODAL,
} from './types';

const initState = {
  image: '',
  rating: 0,
  isOpen: false,
};

export default (state = { ...initState }, { type, payload }) => {
  switch (type) {
    case OPEN_POST_MODAL:
      return {
        ...state,
        ...payload,
        isOpen: true,
      };
    case CLOSE_POST_MODAL:
      return { ...initState };
    default:
      return state;
  }
};
