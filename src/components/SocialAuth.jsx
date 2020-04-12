import React from 'react';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

import GoogleIcon from '../assets/img/icons/Google.svg';
import FacebookIcon from '../assets/img/icons/Facebook.svg';

const SocialAuth = () => {
  const responseGoogle = (response) => {
    console.log(response);
    const { error } = response;
    if (error) {
      console.log(error);
    } else {
      const { profileObj } = response;
      if (profileObj) {
        axios
          .post('/auth/google', profileObj)
          .then((res) => {
            console.log('MyAPI response:', res);
          })
          .catch(err => {
            console.log(err.response);
          });
      }
    }
  };

  const responseFacebook = () => {

  };

  return (
    <div>
      <FacebookLogin
        render={(renderProps) => (
          <button
            type="button"
            className="btn"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            <img
              alt="Icon"
              src={FacebookIcon}
              className="custom-user-pic-2 custom-filter-1"
            />
          </button>
        )}
      />
      <GoogleLogin
        clientId="943084470616-5e59iref3jcan2cl25u23mot8ecp51v1.apps.googleusercontent.com"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        // cookiePolicy={'single_host_origin'}
        render={(renderProps) => (
          <button
            type="button"
            className="btn"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            <img
              alt="Icon"
              src={GoogleIcon}
              className="custom-user-pic-2 custom-filter-1"
            />
          </button>
        )}
      />
    </div>
  );
};

export default SocialAuth;
