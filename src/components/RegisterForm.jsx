import React from 'react';
import { useDispatch } from 'react-redux';
import {
  FiUser,
  FiLock,
  FiUpload,
} from 'react-icons/fi';

import FileUpload from './FileUpload';
import SocialAuth from './SocialAuth';

import { registerUser } from '../redux/user/actions';
import { validateEmail, fetchUsernameFromEmail } from '../helpers';
import { changeView } from '../redux/auth-modal/actions';

import notification from './notifications';

const RegisterForm = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [avatar, setAvatar] = React.useState(null);
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

  const onUpload = (file) => {
    setAvatar(file);
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

    const username = fetchUsernameFromEmail(email);

    return dispatch(registerUser(username, email, password, avatar, (success, err) => {
      if (success) {
        setEmail('');
        setPassword('');
        setAvatar(null);

        dispatch(changeView('login'));
        notification.success('Signup Success', 'You have signed up successfully! Please login in!');
      } else {
        notification.error('Signup Failed', `Oops! Failed to signup. ${err}`);
      }
    }));
  };

  return (
    <div>
      <div className="align-items-center form-group justify-content-center mb-4 row">
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
      <div className="align-items-center form-group justify-content-center mb-3 row">
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
          <FileUpload
            name="avatar"
            accept="image/*"
            className="d-none"
            label={(
              <span className="category-item shadow rounded-circle border bg-black">
                <FiUpload className="category-item-icon m-auto text-white" />
              </span>
            )}
            onUpload={onUpload}
          />
          <p>Upload Avatar</p>
          <button
            type="submit"
            onClick={onSubmit}
            className="badge-pill btn btn-black mb-2 px-5"
          >
            <span className="font-weight-bold px-3">Register</span>
          </button>
          <span className="text-body">Or</span>
          <SocialAuth />
          {/* <div>
            <button type="button" className="btn">
              <img
                alt="Icon"
                src={FacebookIcon}
                className="custom-user-pic-2 custom-filter-1"
              />
            </button>
            <a href="http://postno1.herokuapp.com/signin/google" className="btn">
              <img
                alt="Icon"
                src={GoogleIcon}
                className="custom-user-pic-2 custom-filter-1"
              />
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
