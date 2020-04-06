import React from 'react';
import PropTypes from 'prop-types';
import ReactStarRatings from 'react-star-ratings';

const StarRating = ({ rating, onChange }) => (
  <ReactStarRatings
    name="rating"
    starSpacing="0px"
    numberOfStars={5}
    starDimension="20px"
    starRatedColor="rgb(230, 67, 47)"
    changeRating={onChange}
    rating={rating}
  />
);

StarRating.defaultProps = {
  rating: 0,
  onChange: null,
};

StarRating.propTypes = {
  rating: PropTypes.number,
  onChange: PropTypes.func,
};

export default StarRating;
