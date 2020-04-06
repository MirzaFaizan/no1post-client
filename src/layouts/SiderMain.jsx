import React from 'react';
import PropTypes from 'prop-types';

const SiderMain = ({ children }) => (
  <div className="col custom-scrollbar h-89 main ml-md-3 overflow-auto pb-3 px-0 px-2 px-md-3">
    { children }
  </div>
);

SiderMain.defaultProps = {
  children: null,
};

SiderMain.propTypes = {
  children: PropTypes.node,
};

export default SiderMain;
