import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  Button,
  Modal,
  Form,
} from 'react-bootstrap';

import { editCategory } from '../redux/categories/actions';

const EditCategoryModal = ({
  isOpen,
  onClose,
  category,
}) => {
  const dispatch = useDispatch();

  const [categoryId, setCategoryId] = React.useState('');
  const [categoryName, setCategoryName] = React.useState(category.category);
  const [categoryImage, setCategoryImage] = React.useState(category.imageUrl);
  const [categoryImageFile, setCategoryImageFile] = React.useState(null);

  React.useEffect(() => {
    setCategoryId(category._id);
    setCategoryName(category.category);
    setCategoryImage(category.imageUrl);
    setCategoryImageFile(null);
  }, [category._id]);

  const onChange = (event) => {
    setCategoryName(event.target.value);
  };

  const onUpload = (event) => {
    const [file] = event.target.files;

    if (file) {
      setCategoryImageFile(file);
    }
  };

  const onSubmit = () => {
    dispatch(editCategory(categoryId, categoryName, categoryImageFile, (success) => {
      if (success) {
        onClose();
      }
    }));
  };

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <h1>Add Category</h1>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-2">
          <img
            src={categoryImage}
            alt={category.category}
            width="40px"
            height="40px"
            className="object-fit-cover"
          />
        </div>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={categoryName}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Category Image</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={onUpload}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onSubmit}>Edit Category</Button>
        <Button variant="secondary" onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

EditCategoryModal.defaultProps = {
  isOpen: false,
  onClose: null,
  category: {
    _id: '',
    imageUrl: '',
    category: '',
  },
};

EditCategoryModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  category: PropTypes.instanceOf(Object),
};

export default EditCategoryModal;
