import {
  LOGIN,
  LOGOUT,
} from './types';

const initState = {
  name: '',
  email: '',
  userType: '',
  isLoading: true,
  isAuthenticated: false,
};

export default (state = { ...initState }, { type, payload }) => {
  switch (type) {
    case LOGIN:
      return {
        ...payload,
        isLoading: false,
        isAuthenticated: true,
      };
    case LOGOUT:
      return {
        ...initState,
        isLoading: false,
      };
    default:
      return state;
  }
};
