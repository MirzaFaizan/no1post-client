import React from 'react';

import {
  FiUser,
  FiLock,
} from 'react-icons/fi';

import GoogleIcon from '../assets/img/icons/Google.svg';
import FacebookIcon from '../assets/img/icons/Facebook.svg';

const LoginForm = () => (
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
        <button type="submit" className="badge-pill btn btn-black mb-2 px-5">
          <span className="font-weight-bold px-3">Login</span>
        </button>
        <span className="text-body mb-3">Or</span>
        <div>
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
        </div>
      </div>
    </div>
  </div>
);

export default LoginForm;
