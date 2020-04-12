import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  Button,
  Modal,
  Form,
} from 'react-bootstrap';

import { addCategory } from '../redux/categories/actions';

import fontawesomeClassNames from '../types/icons-list';

let selectOptions;

selectOptions = [
  {value: '', label: 'Select Icon'},
  ...fontawesomeClassNames.map((name) => ({
    value: name,
    label: <><span className={name}></span> {name}</>,
  }))
];

const AddCategoryModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const [category, setCategory] = React.useState('');
  const [categoryIcon, setCategoryIcon] = React.useState('');

  const onChange = (event) => {
    setCategory(event.target.value);
  };

  const onChangeIcon = (data) => {
    setCategoryIcon(data.value);
  };

  const onSubmit = () => {
    dispatch(addCategory(category, categoryIcon, (success) => {
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
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={category}
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
        <Button variant="primary" onClick={onSubmit}>Add Category</Button>
        <Button variant="secondary" onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

AddCategoryModal.defaultProps = {
  isOpen: false,
  onClose: null,
};

AddCategoryModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default AddCategoryModal;
