import React from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import {
  Modal,
} from 'react-bootstrap';
import {
  FiMic,
  FiImage,
  FiPlayCircle,
} from 'react-icons/fi';
import FileUpload from './FileUpload';

import { adminAddPost } from '../redux/posts/actions';

const AddPostModal = ({ isOpen, onClose, categories }) => {
  const dispatch = useDispatch();
  
  const [file, setFile] = React.useState(null);
  const [fileType, setFileType] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [description, setDescription] = React.useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case 'category':
        return setCategory(value);
      case 'description':
        return setDescription(value);
      default:
        return;
    }
  };

  const onUpload = (file) => {
    const { type } = file;

    if (type.includes('image')) {
      setFileType('image');
    } else if (type.includes('audio')) {
      setFileType('audio');
    } else if (type.includes('video')) {
      setFileType('video');
    }

    setFile(file);
  };

  const handleSubmit = (event) => {
    dispatch(adminAddPost(description, category, file, fileType));
  };

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Body>
        <div className="form-group">
          <label>Description</label>
          <textarea
            rows={4}
            name="description"
            value={description}
            onChange={handleChange}
            placeholder="Description"
            className="form-control w-100"
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            value={category}
            onChange={handleChange}
            className="form-control w-100"
          >
            <option value="" disabled>Select Category</option>
            {
              categories.map((category) => (
                <option
                  key={category._id}
                  value={category._id}
                >
                  {category.category}
                </option>
              ))
            }
          </select>
        </div>
        {
          file
            ? <p>Type: {fileType} - Name: {file.name}</p>
            : null
        }
        <div className="form-group">
          <FileUpload
            accept="video/*"
            className="d-none"
            name="video-upload"
            label={(
              <span className="btn custom-gray-color mb-2 mb-md-0 mr-2">
                <FiPlayCircle className="icon-2x" />
              </span>
            )}
            onUpload={onUpload}
          />
          <FileUpload
            accept="audio/*"
            className="d-none"
            name="audio-upload"
            label={(
              <span className="btn custom-gray-color mb-2 mb-md-0 mr-2">
                <FiMic className="icon-2x" />
              </span>
            )}
            onUpload={onUpload}
          />
          <FileUpload
            accept="image/*"
            className="d-none"
            name="image-upload"
            label={(
              <span className="btn custom-gray-color mb-2 mb-md-0 mr-2">
                <FiImage className="icon-2x" />
              </span>
            )}
            onUpload={onUpload}
          />
        </div>
        <div className="form-group">
          <button
            type="button"
            onClick={handleSubmit}
            className="btn btn-primary"
          >
            Create post
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

AddPostModal.defaultProps = {
  isOpen: false,
  onClose: null,
  categories: [],
};

AddPostModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  categories: PropTypes.instanceOf(Array),
};

const mapStateToProps = (state) => ({
  categories: state.categories,
});

export default connect(mapStateToProps)(AddPostModal);
