import React from 'react';
import PropTypes from 'prop-types';

import Navbar from '../components/Navbar';

const MainLayout = ({ children }) => (
  <section className="container-fluid px-0 container-for-scroll custom-primary-color-text">
    <Navbar />
    <div className="h-100 ml-md-3 mr-0 mx-0 row">
      { children }
    </div>
  </section>
);

MainLayout.defaultProps = {
  children: null,
};

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;
