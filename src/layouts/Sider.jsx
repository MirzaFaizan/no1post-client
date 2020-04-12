import React from 'react';
import PropTypes from 'prop-types';

const Sider = ({ children }) => (
  <div className="bg-white col-2 custom-rounded-2rem h-85 my-3 overflow-auto px-0 sidebar d-none d-md-block">
    { children }
  </div>
);

Sider.defaultProps = {
  children: null,
};

Sider.propTypes = {
  children: PropTypes.node,
};

export default Sider;
