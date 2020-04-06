import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  FiMic,
  FiImage,
  FiPlayCircle,
} from 'react-icons/fi';
import {
  FaRocketchat,
} from 'react-icons/fa';

import Image from './Image';
import TextArea from './TextArea';
import FileUpload from './FileUpload';

import DefaultUserImage from '../assets/img/default-user.png';

import { addPost } from '../redux/posts/actions';

const CreatePost = ({ user, dispatch }) => {
  const [file, setFile] = React.useState(null);
  const [description, setDescription] = React.useState('');
  const [tempFileURL, setTempFileURL] = React.useState('');
  const [tempFileType, setTempFileType] = React.useState('');

  // console.log(user);

  React.useEffect(() => {
    // console.clear();
    // console.log(file);
  }, [file]);

  const onUpload = (uploadedFile) => {
    setFile(uploadedFile);
    setTempFileURL(URL.createObjectURL(uploadedFile));

    if (uploadedFile.type.includes('audio/')) {
      setTempFileType('audio');
    } else if (uploadedFile.type.includes('video/')) {
      setTempFileType('video');
    } else {
      setTempFileType('image');
    }
  };

  const onChange = (event) => {
    const { value } = event.target;

    setDescription(value);
  };

  const onSubmit = () => {
    const formData = new FormData();

    formData.append('file', file);
    formData.append('description', description);

    dispatch(addPost(file, description));

    // URL.revokeObjectURL(tempFileURL);

    setFile(null);
    setTempFileURL('');
    setDescription('');
  };

  const filePreview = () => {
    if (!(file && tempFileType)) {
      return null;
    }

    switch (tempFileType) {
      case 'audio':
        return (
          <div>
            <FiMic />
            <span className="pl-2">{file.name}</span>
          </div>
        );
      case 'video':
        return (
          <div>
            <FiPlayCircle />
            <span className="pl-2">{file.name}</span>
          </div>
        );
      case 'image':
        return (
          <div>
            <Image src={tempFileURL} width="64" height="64" />
            <span className="pl-2">{file.name}</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="card col custom-card custom-rounded-2rem mb-4 my-3 px-0">
      <div className="card-body">
        <div className="d-flex">
          <div>
            <Image
              circle
              alt={user.name}
              src={DefaultUserImage}
            />
          </div>
          <div className="ml-3 mt-2 w-75">
            <TextArea
              name="description"
              value={description}
              onChange={onChange}
              placeholder="Let’s get your post on top!"
            />
            {filePreview()}
          </div>
        </div>
      </div>
      <div className="align-items-center bg-transparent card-footer flex-md-row justify-content-center mx-0 mx-4 px-0 row">
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
        <button
          type="button"
          onClick={onSubmit}
          className="align-items-center badge-pill btn btn-primary d-flex mb-2 mb-md-0 ml-md-auto px-4"
        >
          <span className="font-weight-bold pr-3">
            Post for 12$
          </span>
          <span>
            <FaRocketchat className="icon-2x" />
          </span>
        </button>
      </div>
    </div>
  );
};

CreatePost.defaultProps = {
  user: null,
  dispatch: null,
};

CreatePost.propTypes = {
  dispatch: PropTypes.func,
  user: PropTypes.instanceOf(Object),
};

const mapStateToProps = ({ user }) => ({
  user,
});

export default connect(mapStateToProps, null)(CreatePost);
