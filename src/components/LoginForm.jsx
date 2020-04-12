import React from 'react';
import { useDispatch } from 'react-redux';
import {
  FiUser,
  FiLock,
} from 'react-icons/fi';

import SocialAuth from './SocialAuth';

import { validateEmail } from '../helpers';
import { loginUser } from '../redux/user/actions';
import { closeAuthModal } from '../redux/auth-modal/actions';

import notification from './notifications';

const LoginForm = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    if (error) {
      notification.error('Register Form Error', error);
    }
  }, [error]);

  const onChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const onSubmit = () => {
    setError('');

    if (email.length < 6) {
      return setError('Email should be longer than 6 characters');
    }

    if (password.length < 6) {
      return setError('Password should be longer than 6 characters');
    }

    if (!validateEmail(email)) {
      return setError('Invalid email address provided');
    }

    return dispatch(loginUser(email, password, (success, err) => {
      if (success) {
        setEmail('');
        setPassword('');

        dispatch(closeAuthModal());

        notification.success('Signin Success');
      } else {
        notification.error('Signin Failed', `Oops! Failed to signin. ${err}`);
      }
    }));
  };

  return (
    <div>
      <div className="form-group justify-content-center align-items-center mb-lg-5 pb-3 row">
        <label
          htmlFor="email"
          className="align-items-center mb-0 text-body d-flex justify-content-center  w-100 col-10"
        >
          <FiUser />
          <div className="col-10">
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={onChange}
              placeholder="Email"
              className="border-left-0 border-right-0 border-top-0 form-control"
            />
          </div>
        </label>
      </div>
      <div className="form-group justify-content-center align-items-center row">
        <label
          htmlFor="password"
          className="align-items-center mb-0 text-body d-flex justify-content-center  w-100 col-10"
        >
          <FiLock />
          <div className="col-10">
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={onChange}
              placeholder="Password"
              className="border-left-0 border-right-0 border-top-0 form-control"
            />
          </div>
        </label>
      </div>
      <div className="form-group row">
        <div className="align-items-center col d-flex flex-column">
          <button type="button" className="btn text-grey-to-black mb-2">
            <span>Forgot Password?</span>
          </button>
          <button
            type="submit"
            onClick={onSubmit}
            className="badge-pill btn btn-black mb-2 px-5"
          >
            <span className="font-weight-bold px-3">Login</span>
          </button>
          <span className="text-body mb-3">Or</span>
          <SocialAuth />
          {/* <div>
            <button type="button" className="btn">
              <img
                alt="Icon"
                src={FacebookIcon}
                className="custom-user-pic-2 custom-filter-1"
              />
            </button>
            <button type="button" className="btn">
              <img
                alt="Icon"
                src={GoogleIcon}
                className="custom-user-pic-2 custom-filter-1"
              />
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
