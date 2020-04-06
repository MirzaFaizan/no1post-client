import React from 'react';
import PropTypes from 'prop-types';

const Image = ({
  src,
  alt,
  width,
  height,
  className,
  circle,
  rounded,
}) => (
  <img
    alt={alt}
    src={src}
    width={width}
    height={height}
    className={`
      ${className}
      ${circle ? 'rounded-circle' : ''}
      ${rounded ? 'custom-rounded-2rem' : ''}
    `}
  />
);

Image.defaultProps = {
  alt: '',
  src: '',
  width: 50,
  height: 50,
  className: '',
  circle: false,
  rounded: false,
};

Image.propTypes = {
  alt: PropTypes.string,
  src: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  className: PropTypes.string,
  circle: PropTypes.bool,
  rounded: PropTypes.bool,
};

export default Image;
