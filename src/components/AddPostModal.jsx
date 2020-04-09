import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
} from 'react-bootstrap';

import CreatePost from './CreatePost';

const AddPostModal = ({ isOpen, onClose }) => (
  <Modal show={isOpen} onHide={onClose}>
    <Modal.Body>
      <CreatePost />
    </Modal.Body>
  </Modal>
);

AddPostModal.defaultProps = {
  isOpen: false,
  onClose: null,
};

AddPostModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default AddPostModal;
