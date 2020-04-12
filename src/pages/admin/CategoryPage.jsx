import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Table,
  Button,
} from 'react-bootstrap';

import {
  addCategory,
  removeCategory,
} from '../../redux/categories/actions';

import AddCategoryModal from '../../components/AddCategoryModal';
import EditCategoryModal from '../../components/EditCategoryModal';

const CategoryPage = ({ categories, remove }) => {
  const [selectedCategory, setSelectedCategory] = React.useState({
    _id: '', category: '', icon: '',
  });
  const [addModalOpen, setAddModalOpen] = React.useState(false);
  const [editModalOpen, setEditModalOpen] = React.useState(false);

  const onAddModalOpen = () => setAddModalOpen(true);
  const onAddModalClose = () => setAddModalOpen(false);
  const onEditModalOpen = () => setEditModalOpen(true);
  const onEditModalClose = () => setEditModalOpen(false);

  return (
    <div>
      <h2 className="mb-5">
        Categories Page
      </h2>
      <div className="mb-2">
        <Button type="button" variant="primary" onClick={onAddModalOpen}>
          Add Category
        </Button>
      </div>
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Slug</th>
              <th>Icon</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id}>
                <td>{category._id}</td>
                <td>{category.category}</td>
                <td>{category.slug}</td>
                <td><i className={category.icon}></i></td>
                <td className="text-center">
                  <button
                    type="button"
                    className="btn btn-sm btn-warning mr-1"
                    onClick={() => {
                      setSelectedCategory(category);
                      onEditModalOpen();
                    }}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-danger ml-1"
                    onClick={() => remove(category._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <AddCategoryModal
        isOpen={addModalOpen}
        onClose={onAddModalClose}
      />
      <EditCategoryModal
        category={selectedCategory}
        isOpen={editModalOpen}
        onClose={onEditModalClose}
      />
    </div>
  );
};

CategoryPage.defaultProps = {
  remove: null,
  categories: [],
};

CategoryPage.propTypes = {
  remove: PropTypes.func,
  categories: PropTypes.instanceOf(Array),
};

const mapStateToProps = ({ categories }) => ({
  categories,
});

const mapDispatchToProps = (dispatch) => ({
  add: (category) => dispatch(addCategory(category)),
  edit: (id, category) => dispatch(id, category),
  remove: (id) => dispatch(removeCategory(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);
