import {
  ADD_CATEGORY,
  ADD_CATEGORIES,
  INIT_CATEGORIES,
  CLEAR_CATEGORIES,
} from './types';

const initState = [
  'category1',
  'category2',
  'category3',
  'category4',
  'category5',
];

export default (state = [...initState], { type, payload }) => {
  switch (type) {
    case ADD_CATEGORY:
      return [...state, payload];
    case ADD_CATEGORIES:
      return [...state, ...payload];
    case INIT_CATEGORIES:
      return [...payload];
    case CLEAR_CATEGORIES:
      return [...initState];
    default:
      return state;
  }
};
