import React from 'react';
import PropTypes from 'prop-types';

import MyNavbar from '../components/Navbar';

const ClientLayout = ({ children }) => (
  <section className="container-fluid px-0 container-for-scroll custom-primary-color-text">
    <MyNavbar />
    <div className="h-100 ml-md-3 mr-0 mx-0 row">
      { children }
    </div>
  </section>
);

ClientLayout.defaultProps = {
  children: null,
};

ClientLayout.propTypes = {
  children: PropTypes.node,
};

export default ClientLayout;
