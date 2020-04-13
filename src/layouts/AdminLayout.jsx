import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Link,
} from 'react-router-dom';
import {
  Nav,
  Navbar,
  Container,
} from 'react-bootstrap';

import { logoutAdmin } from '../redux/admin/actions';

const AdminLayout = ({ children }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogout = () => {
    history.push('/admin/login');
    dispatch(logoutAdmin());
  };

  return (
    <div>
      <Navbar expand="lg" variant="dark" bg="dark">
        <Container>
          <Navbar.Brand href="#home">NumberOnePost</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Link to="/admin" className="nav-link">Dashboard</Link>
              <Link to="/admin/categories" className="nav-link">Categories</Link>
              <Link to="/admin/users" className="nav-link">Users</Link>
              <button
                className="nav-link button-invisible d-inline-block mr-auto"
                onClick={handleLogout}
              >
                Logout
              </button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="pt-5">
        {children}
      </Container>
    </div>
  );
};

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminLayout;
