import React from 'react';
import PropTypes from 'prop-types';
import {
  FiHeart,
} from 'react-icons/fi';

const Category = ({ category, onSelectCategory }) => {
  const handleOnSelectCategory = () => {
    onSelectCategory(category);
  };

  return (
    <li className="mb-5 text-center">
      <button
        type="button"
        onClick={handleOnSelectCategory}
        className="category-link text-decoration-none button-invisible d-inline"
      >
        <span className="mx-auto category-item rounded-circle shadow btn-outline-info">
          <FiHeart className="category-item-icon" />
        </span>
        <div className="mt-3 h4 text-center">
          {category}
        </div>
      </button>
    </li>
  );
};

Category.defaultProps = {
  category: '',
  onSelectCategory: null,
};

Category.propTypes = {
  category: PropTypes.string,
  onSelectCategory: PropTypes.func,
};

export default Category;
