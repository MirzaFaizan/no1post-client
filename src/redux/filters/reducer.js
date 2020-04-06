import {
  SET_CATEGORY_FILTER,
  CLEAR_CATEGORY_FILTER,
} from './types';

const initState = {
  category: '',
};

export default (state = { ...initState }, { type, payload }) => {
  switch (type) {
    case SET_CATEGORY_FILTER:
      return {
        ...state,
        category: payload,
      };

    case CLEAR_CATEGORY_FILTER:
      return {
        ...state,
        category: '',
      };

    default:
      return state;
  }
};
