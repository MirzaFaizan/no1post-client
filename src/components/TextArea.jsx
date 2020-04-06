import React from 'react';
import PropTypes from 'prop-types';

const TextArea = ({
  rows,
  name,
  value,
  onChange,
  className,
  placeholder,
}) => (
  <textarea
    name={name}
    rows={rows}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`w-100 h3 ${className}`}
  />
);

TextArea.defaultProps = {
  rows: 4,
  name: '',
  value: '',
  onChange: null,
  className: '',
  placeholder: '',
};

TextArea.propTypes = {
  rows: PropTypes.number,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  placeholder: PropTypes.string,
};

export default TextArea;
