import {
  SET_CATEGORY_FILTER,
  CLEAR_CATEGORY_FILTER,
} from './types';

export const setCategoryFilter = (category) => ({
  type: SET_CATEGORY_FILTER,
  payload: category,
});

export const clearCategoryFilter = () => ({
  type: CLEAR_CATEGORY_FILTER,
});
