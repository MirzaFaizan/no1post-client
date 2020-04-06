import {
  LOGIN_USER,
  LOGOUT_USER,
} from './types';

import { USER } from '../../types/user';

export const loginUser = () => (dispatch) => {
  dispatch({
    type: LOGIN_USER,
    payload: {
      userType: USER,
      name: 'some name',
      email: 'some_name@gmail.com',
    },
  });
};

export const logoutUser = () => (dispatch) => {
  dispatch({
    type: LOGOUT_USER,
  });
};
