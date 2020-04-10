import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FaSearch } from 'react-icons/fa';

import Image from './Image';

import {
  openAuthModal as openAuthModalAction,
} from '../redux/auth-modal/actions';

import DefaultImage from '../assets/img/default-user.png';

const Navbar = ({
  heading,
  imageUrl,
  userType,
  openAuthModal,
  isAuthenticated,
}) => {
  const getNavbarActions = () => {
    if (!isAuthenticated) {
      return (
        <button
          type="button"
          onClick={openAuthModal}
          className="badge-pill btn btn-primary font-weight-bold px-md-4 py-1 py-md-2"
        >
          Login / Sign Up
        </button>
      );
    }
    
    if (userType === 'guest') {
      return (
        <>
          <button
            type="button"
            onClick={openAuthModal}
            className="badge-pill btn btn-primary font-weight-bold px-md-4 py-1 py-md-2 mr-3"
          >
            Login / Sign Up
          </button>
          <span>
            <Image circle alt="User" src={imageUrl} />
          </span>
        </>
      );
    }

    return (
      <span>
        <Image circle alt="User" src={imageUrl} />
      </span>
    );
  };
  
  return (
    <header>
      <nav className="align-items-center bg-white d-flex justify-content-between px-2 px-md-4 py-2">
        <div>
          <span className="h3">
            {heading}
          </span>
        </div>
        <div className="align-items-center d-flex">
          <span className="mr-3 mr-md-5">
            <FaSearch className="icon-2x" />
          </span>
          {getNavbarActions()}
        </div>
      </nav>
    </header>
  );
};

Navbar.defaultProps = {
  userType: 'guest',
  openAuthModal: null,
  imageUrl: DefaultImage,
  heading: 'NumberOnePost',
  isAuthenticated: false,
};

Navbar.propTypes = {
  heading: PropTypes.string,
  imageUrl: PropTypes.string,
  userType: PropTypes.string,
  openAuthModal: PropTypes.func,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = ({ user }) => ({
  imageUrl: user.imageUrl,
  userType: user.userType,
  isAuthenticated: user.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  openAuthModal: () => dispatch(openAuthModalAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
