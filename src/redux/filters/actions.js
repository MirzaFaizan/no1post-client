import {
  SET_SEARCH_FILTER,
  CLEAR_SEARCH_FILTER,
  SET_CATEGORY_FILTER,
  CLEAR_CATEGORY_FILTER,
} from './types';

export const setSearchFilter = (search) => ({
  type: SET_SEARCH_FILTER,
  payload: search,
});

export const clearSearchFilter = (search) => ({
  type: CLEAR_SEARCH_FILTER,
});

export const setCategoryFilter = (category) => ({
  type: SET_CATEGORY_FILTER,
  payload: category,
});

export const clearCategoryFilter = () => ({
  type: CLEAR_CATEGORY_FILTER,
});
