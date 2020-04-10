import {
  UPDATE_RATE,
  LOADING_RATE,
} from './types';

const initState = {
  rate: 0,
  isLoading: true,
};

export default (state = { ...initState }, { type, payload }) => {
  switch (type) {
    case UPDATE_RATE:
      return {
        rate: payload,
        isLoading: false,
      };
    case LOADING_RATE:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};
