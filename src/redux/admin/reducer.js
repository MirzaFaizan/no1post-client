import {
  LOGIN,
  LOGOUT,
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
    case LOGIN:
      return {
        ...payload,
        imageUrl: (payload.imageUrl || DefaultUserImage),
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
