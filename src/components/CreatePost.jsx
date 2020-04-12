import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Spinner } from 'react-bootstrap';
import StripeCheckout from 'react-stripe-checkout';
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

import { addPost } from '../redux/posts/actions';
import { updateRate } from '../redux/post-rate/actions';

import notification from './notifications';

const CreatePost = ({
  user,
  admin,
  dispatch,
  postRate,
  categories,
}) => {
  const [loading, setLoading] = React.useState(false);

  const [file, setFile] = React.useState(null);
  const [category, setCategory] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [tempFileURL, setTempFileURL] = React.useState('');
  const [tempFileType, setTempFileType] = React.useState('');

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
    const { name, value } = event.target;

    switch (name) {
      case 'description':
        setDescription(value);
        break;
      case 'category':
        setCategory(value);
        break;
      default:
        break;
    }
  };

  const onSubmit = (token) => {
    setLoading(true);

    dispatch(addPost(token, postRate.rate, file, tempFileType, description, category, (success) => {
      setLoading(false);

      if (success) {
        notification.success('Post Created', 'Post was successfully created.');
      } else {
        notification.error('Post Failed', 'Oops! Failed to create the post.');
      }

      URL.revokeObjectURL(tempFileURL);

      setFile(null);
      setCategory('');
      setTempFileURL('');
      setDescription('');
      setTempFileType('');
    }));
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
  
  const handleToken = (token) => {
    console.log(token);
    onSubmit(token.id);
  };

  return (
    <div className="card col custom-card custom-rounded-2rem mb-4 my-3 px-0">
      <div className="card-body">
        <div className="d-flex">
          <div>
            <Image
              circle
              alt={user.name}
              src={user.imageUrl}
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
        <div className="align-items-center d-flex mb-2 mb-md-0 ml-md-auto">
          <Form.Control
            as="select"
            name="category"
            value={category}
            onChange={onChange}
            style={{
              display: 'inline-block',
              marginRight: '8px',
              width: 'auto',
            }}
          >
            <option value="" disabled>Select Category</option>
            {
              categories.map((item) => (
                <option
                  key={item._id}
                  value={item._id}
                >
                  {item.category}
                </option>
              ))
            }
          </Form.Control>
          {
            !loading && !postRate.isLoading
              ? (
                <StripeCheckout
                  name="CreatePost"
                  currency="USD"
                  email={user.email}
                  token={handleToken}
                  billingAddress={false}
                  shippingAddress={false}
                  amount={postRate.rate * 100}
                  stripeKey="pk_test_b5TM5xwfx9cXw1eyNqWoBhTz00n4IFkQiJ"
                >
                  <button
                    type="button"
                    disabled={loading || postRate.isLoading}
                    className="align-items-center badge-pill btn btn-primary d-flex px-4"
                  >
                    { admin ? 'Create Post' : `Post for ${postRate.rate}$` }
                  </button>
                </StripeCheckout>
              )
              : (
                <span
                  className="align-items-center badge-pill opaque btn btn-primary d-flex px-4"
                >
                  <span className="mr-2">Loading...</span>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                </span>
              )
          }
        </div>
      </div>
    </div>
  );
};

CreatePost.defaultProps = {
  user: null,
  admin: false,
  categories: null,
  dispatch: null,
  postRate: null,
};

CreatePost.propTypes = {
  admin: PropTypes.bool,
  dispatch: PropTypes.func,
  user: PropTypes.instanceOf(Object),
  postRate: PropTypes.instanceOf(Object),
  categories: PropTypes.instanceOf(Object),
};

const mapStateToProps = ({ user, admin, categories, postRate }, props) => ({
  categories,
  postRate: postRate,
  user: props.admin ? admin : user,
});

export default connect(mapStateToProps, null)(CreatePost);
