import {
  SET_SEARCH_FILTER,
  CLEAR_SEARCH_FILTER,
  SET_CATEGORY_FILTER,
  CLEAR_CATEGORY_FILTER,
} from './types';

const initState = {
  search: '',
  category: '',
};

export default (state = { ...initState }, { type, payload }) => {
  switch (type) {
    case SET_SEARCH_FILTER:
      return {
        ...state,
        search: payload,
      };
    case CLEAR_SEARCH_FILTER:
      return {
        ...state,
        search: '',
      };
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
