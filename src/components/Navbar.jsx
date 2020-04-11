import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FaSearch } from 'react-icons/fa';

import Image from './Image';

import {
  setSearchFilter,
} from '../redux/filters/actions';
import {
  openAuthModal as openAuthModalAction,
} from '../redux/auth-modal/actions';

import DefaultImage from '../assets/img/default-user.png';

const Navbar = ({
  heading,
  imageUrl,
  userType,
  setSearch,
  searchFilter,
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
          <div>
            <textarea
              name="search"
              placeholder="Search"
              value={searchFilter}
              onChange={setSearch}
              rows={1}
              class="form-control navbar-input"
            />
          </div>
          <button
            type="button"
            onClick={() => console.log('search')}
            className="mr-3 mr-md-5 button-invisible"
          >
            <FaSearch className="icon-2x" />
          </button>
          {getNavbarActions()}
        </div>
      </nav>
    </header>
  );
};

Navbar.defaultProps = {
  dispatch: null,
  searchFilter: '',
  userType: 'guest',
  openAuthModal: null,
  imageUrl: DefaultImage,
  heading: 'NumberOnePost',
  isAuthenticated: false,
};

Navbar.propTypes = {
  setSearch: null,
  dispatch: PropTypes.func,
  heading: PropTypes.string,
  imageUrl: PropTypes.string,
  userType: PropTypes.string,
  openAuthModal: PropTypes.func,
  searchFilter: PropTypes.string,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = ({ user, filters }) => ({
  imageUrl: user.imageUrl,
  userType: user.userType,
  searchFilter: filters.search,
  isAuthenticated: user.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  openAuthModal: () => dispatch(openAuthModalAction()),
  setSearch: (event) => {
    const { value } = event.target;
    dispatch(setSearchFilter(value));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
