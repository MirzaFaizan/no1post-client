import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  Button,
  Modal,
  Form,
} from 'react-bootstrap';

import { editCategory } from '../redux/categories/actions';

import fontawesomeClassNames from '../types/icons-list';

let selectOptions;

selectOptions = [
  {value: '', label: 'Select Icon'},
  ...fontawesomeClassNames.map((name) => ({
    value: name,
    label: <><span className={name}></span> {name}</>,
  }))
];

const EditCategoryModal = ({
  isOpen,
  onClose,
  category,
}) => {
  const dispatch = useDispatch();

  const [categoryId, setCategoryId] = React.useState('');
  const [categoryIcon, setCategoryIcon] = React.useState(category.icon);
  const [categoryName, setCategoryName] = React.useState(category.category);

  React.useEffect(() => {
    setCategoryId(category._id);
    setCategoryIcon(category.icon);
    setCategoryName(category.category);
  }, [category._id]);

  const onChange = (event) => {
    setCategoryName(event.target.value);
  };

  const onChangeIcon = (data) => {
    setCategoryIcon(data.value);
  };

  const onSubmit = () => {
    dispatch(editCategory(categoryId, categoryName, categoryIcon, (success) => {
      if (success) {
        onClose();
      }
    }));
  };

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <h1>Edit Category</h1>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={categoryName}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Category Icon <i className={`${categoryIcon} text-danger`}></i></Form.Label>
          <Select
            value={categoryIcon}
            name="category-icon"
            onChange={onChangeIcon}
            options={selectOptions}
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
