import {
  LOGIN_USER,
  LOGOUT_USER,
} from './types';

import DefaultUserImage from '../../assets/img/default-user.png';

const initState = {
  name: '',
  email: '',
  userType: '',
  imageUrl: DefaultUserImage,
  isLoading: true,
  isAuthenticated: false,
};

export default (state = { ...initState }, { type, payload }) => {
  switch (type) {
    case LOGIN_USER:
      return {
        ...payload,
        isLoading: false,
        isAuthenticated: true,
      };
    case LOGOUT_USER:
      return {
        ...initState,
        isLoading: false,
      };
    default:
      return state;
  }
};
