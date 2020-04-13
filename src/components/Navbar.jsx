import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Button,
  Form,
  Nav,
  Navbar,
  NavDropdown,
  Spinner,
} from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

import Image from './Image';

import {
  setSearchFilter,
} from '../redux/filters/actions';
import {
  openAuthModal as openAuthModalAction,
} from '../redux/auth-modal/actions';
import { logoutUserAndRegisterAsGuest } from '../redux/user/actions';

import DefaultImage from '../assets/img/default-user.png';

const MyNavbar = ({
  name,
  logout,
  heading,
  imageUrl,
  userType,
  setSearch,
  searchFilter,
  openAuthModal,
  isAuthenticated,
}) => {
  const preventReturn = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  const getNavbarActions = () => {
    // guest, notAuthenticated etc
    if (!isAuthenticated) {
      return <Spinner animation="border" />
    }

    if (userType === 'guest') {
      return (
        <>
          <Nav.Link>
            Signed in as Guest: <img
              alt="User"
              className="object-fit-cover rounded-circle"
              height="35px"
              src="https://postno1.s3.us-east-2.amazonaws.com/default-user.png"
              width="35px"
            />
          </Nav.Link>
          <Nav.Link>
            <Button
              variant="primary"
              className="badge-pill"
              onClick={openAuthModal}
            >
              Signin / Signup
            </Button>
          </Nav.Link>
        </>
      );
    }

    return (
      <>
        <Nav.Link>
          Signed in as {name}
        </Nav.Link>
        <NavDropdown
          title={
            <img
              alt="User"
              height="50px"
              src={imageUrl}
              width="50px"
              className="object-fit-cover rounded-circle"
            />
          }
          id="basic-nav-dropdown"
        >
          <NavDropdown.Item onClick={logout}>
            Logout
          </NavDropdown.Item>
        </NavDropdown>
        {/* <Nav.Link>
          <Button
            type="button"
            variant="primary"
            className="badge-pill"
            onClick={openAuthModal}
          >
            Signin / Signup
          </Button>
        </Nav.Link> */}
      </>
    );
  };
  
  return (
    <Navbar bg="white" expand="lg">
      <Navbar.Brand href="#">{heading}</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <div className="navbar-group">
          <Form inline className="mr-2">
            <textarea
              name="search"
              placeholder="Search"
              value={searchFilter}
              onChange={setSearch}
              onKeyDown={preventReturn}
              rows={1}
              className="form-control navbar-input"
            />
            <button
              type="button"
              onClick={() => console.log('search')}
              className="mr-3 mr-md-5 button-invisible"
            >
              <FaSearch className="icon-2x" />
            </button>
          </Form>
          <Nav>
            {getNavbarActions()}
          </Nav>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};

MyNavbar.defaultProps = {
  name: '',
  logout: null,
  dispatch: null,
  searchFilter: '',
  userType: 'guest',
  openAuthModal: null,
  imageUrl: DefaultImage,
  heading: 'NumberOnePost',
  isAuthenticated: false,
};

MyNavbar.propTypes = {
  name: PropTypes.string,
  logout: PropTypes.func,
  dispatch: PropTypes.func,
  heading: PropTypes.string,
  setSearch: PropTypes.func,
  imageUrl: PropTypes.string,
  userType: PropTypes.string,
  openAuthModal: PropTypes.func,
  searchFilter: PropTypes.string,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = ({ user, filters }) => ({
  name: user.name,
  imageUrl: user.imageUrl,
  userType: user.userType,
  searchFilter: filters.search,
  isAuthenticated: user.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  openAuthModal: () => dispatch(openAuthModalAction()),
  logout: () => dispatch(logoutUserAndRegisterAsGuest()),
  setSearch: (event) => {
    const { value } = event.target;
    dispatch(setSearchFilter(value));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MyNavbar);
