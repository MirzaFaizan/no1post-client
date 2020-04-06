import {
  ADD_CATEGORY,
  INIT_CATEGORIES,
  CLEAR_CATEGORIES,
} from './types';

export const addCategory = (category) => ({
  type: ADD_CATEGORY,
  payload: category,
});

export const addCategories = (categories = []) => ({
  type: ADD_CATEGORY,
  payload: categories,
});

export const initCategories = (categories = []) => ({
  type: INIT_CATEGORIES,
  payload: categories,
});

export const clearCategories = () => ({
  type: CLEAR_CATEGORIES,
});
