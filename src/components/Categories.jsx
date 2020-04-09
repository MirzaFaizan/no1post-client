import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Category from './Category';

import { setCategoryFilter } from '../redux/filters/actions';

const Categories = ({ categories, dispatch }) => {
  const onSelectCategory = (categoryId) => {
    dispatch(setCategoryFilter(categoryId));
  };

  return (
    <div className="d-flex flex-column align-items-center text-center category-wrapper">
      <h2 className="h2 py-5">Categories</h2>
      <ul className="list-group list-unstyled">
        {categories.map(({ _id, category }) => (
          <Category
            key={_id}
            _id={_id}
            name={category}
            onSelectCategory={onSelectCategory}
          />
        ))}
      </ul>
    </div>
  );
};

Categories.defaultProps = {
  categories: [],
  dispatch: null,
};

Categories.propTypes = {
  dispatch: PropTypes.func,
  categories: PropTypes.instanceOf(Array),
};

const mapStateToProps = (props) => ({
  categories: props.categories,
});

export default connect(mapStateToProps, null)(Categories);
