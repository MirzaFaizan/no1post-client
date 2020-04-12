import React from 'react';
import PropTypes from 'prop-types';
import {
  FiHeart,
} from 'react-icons/fi';

const Category = React.memo(({
  _id,
  name,
  icon,
  onSelectCategory,
}) => {
  const handleOnSelectCategory = () => {
    onSelectCategory(_id);
  };

  return (
    <li className="mb-5 text-center">
      <button
        type="button"
        onClick={handleOnSelectCategory}
        className="category-link text-decoration-none button-invisible d-inline"
      >
        <span className="mx-auto category-item rounded-circle shadow btn-outline-info">
          <i className={`category-item-icon ${icon}`} />
        </span>
        <div className="mt-3 h4 text-center">
          {name}
        </div>
      </button>
    </li>
  );
});

Category.defaultProps = {
  _id: '',
  name: '',
  onSelectCategory: null,
};

Category.propTypes = {
  _id: PropTypes.string,
  name: PropTypes.string,
  onSelectCategory: PropTypes.func,
};

export default Category;
