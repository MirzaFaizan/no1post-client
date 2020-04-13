import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

import GoogleIcon from '../assets/img/icons/Google.svg';
import FacebookIcon from '../assets/img/icons/Facebook.svg';

import { API_BASE_URL } from '../types';

import { socialLogin } from '../redux/user/actions';
import { closeAuthModal } from '../redux/auth-modal/actions';

const SocialAuth = () => {
  const dispatch = useDispatch();

  const responseGoogle = (response) => {
    console.log(response);
    const { error } = response;
    if (error) {
      console.log(error);
    } else {
      const { profileObj } = response;
      if (profileObj) {
        axios
          .post(`${API_BASE_URL}/auth/google`, profileObj)
          .then((res) => {
            const { token } = res.data;
            const { imageUrl, email, name } = profileObj;

            const _id = res.data._id || '';

            dispatch(closeAuthModal());
            dispatch(socialLogin(token, _id, name, email, imageUrl));
          })
          .catch(err => {
            console.log(err.response);
          });
      }
    }
  };

  const responseFacebook = (response) => {
    console.log(response);
    let imageUrl = '';

    const { id: facebookId, name, picture, email = '' } = response;

    try {
      imageUrl = picture.data.url
    } catch (error) {
      // Handle Error
    }

    axios
      .post(`${API_BASE_URL}/auth/facebook`, {
        name, email, imageUrl, facebookId,
      })
      .then((res) => {
        const { data: { token }} = res;
        const _id = res.data._id || "";
        dispatch(closeAuthModal());
        dispatch(socialLogin(token, _id, name, email, imageUrl));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <FacebookLogin
        appId="151380576292806"
        fields="name,email,picture"
        callback={responseFacebook}
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
        clientId="943084470616-35lvsq482katpj9k7v7nbbljgudqi5mm.apps.googleusercontent.com"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
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
