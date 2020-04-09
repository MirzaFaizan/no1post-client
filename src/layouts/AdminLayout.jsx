import React from 'react';
import PropTypes from 'prop-types';
import {
  Link,
} from 'react-router-dom';
import {
  Nav,
  Navbar,
  Container,
} from 'react-bootstrap';

const AdminLayout = ({ children }) => (
  <div>
    <Navbar expand="lg" variant="dark" bg="dark">
      <Container>
        <Navbar.Brand href="#home">NumberOnePost</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Link to="/admin" className="nav-link">Dashboard</Link>
            <Link to="/admin/categories" className="nav-link">Categories</Link>
            <Link to="/admin/posts" className="nav-link">Posts</Link>
            <Link to="/admin/users" className="nav-link">Users</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Container className="pt-5">
      {children}
    </Container>
  </div>
);

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminLayout;
