import {
  OPEN_AUTH_MODAL,
  CLOSE_AUTH_MODAL,
} from './types';

const initState = {
  isOpen: false,
};

export default (state = { ...initState }, { type, payload }) => {
  switch (type) {
    case OPEN_AUTH_MODAL:
      return {
        ...state,
        ...payload,
        isOpen: true,
      };
    case CLOSE_AUTH_MODAL:
      return { ...initState };
    default:
      return state;
  }
};
