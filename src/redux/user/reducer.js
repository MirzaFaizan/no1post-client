import {
  LOGIN_USER,
  LOGOUT_USER,
} from './types';

import DefaultUserImage from '../../assets/img/default-user.png';

const initState = {
  _id: '',
  name: '',
  email: '',
  userType: '',
  imageUrl: DefaultUserImage,
  role: null,
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
        imageUrl: (payload.imageUrl || DefaultUserImage),
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
