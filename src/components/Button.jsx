import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ children }) => (
  <button
    type="button"
    className="btn custom-gray-color mb-2 mb-md-0 mr-2"
  >
    { children }
  </button>
);

Button.defaultProps = {
  children: null,
};

Button.propTypes = {
  children: PropTypes.node,
};

export default Button;
