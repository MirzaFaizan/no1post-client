import {
  ADD_CATEGORY,
  ADD_CATEGORIES,
  EDIT_CATEGORY,
  INIT_CATEGORIES,
  REMOVE_CATEGORY,
  CLEAR_CATEGORIES,
} from './types';

const initState = [];

export default (state = [...initState], { type, payload }) => {
  switch (type) {
    case ADD_CATEGORY:
      return [...state, payload];
    case ADD_CATEGORIES:
      return [...state, ...payload];
    case EDIT_CATEGORY:
      return state.map((category) => (
        category._id === payload.id
          ? { ...category, ...payload.category }
          : { ...category }
      ));
    case INIT_CATEGORIES:
      return [...payload];
    case REMOVE_CATEGORY:
      return state.filter((category) => category._id !== payload);
    case CLEAR_CATEGORIES:
      return [...initState];
    default:
      return state;
  }
};
