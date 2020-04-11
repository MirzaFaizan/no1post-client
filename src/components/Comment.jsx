import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FiHeart } from 'react-icons/fi';
import { FaReply, FaTrash, FaHeart } from 'react-icons/fa';

import Image from './Image';
import Replies from './Replies';
import CreateReply from './CreateReply';

import DefaultUserImage from '../assets/img/default-user.png';

import { removeComment } from '../redux/posts/actions';

const Comment = ({
  comment,
  postId,
  userId,
  userType,
  dispatch,
}) => {
  const [liked, setLike] = React.useState(false);
  const [createReplyOpen, setCreateReplyOpen] = React.useState(false);

  const handleLike = () => setLike(!liked);

  const handleToggleCreateReply = () => {
    setCreateReplyOpen(!createReplyOpen);
  };

  const handleRemove = () => {
    dispatch(removeComment(postId, comment._id));
  };

  return (
    <div className="align-items-md-baseline d-flex flex-column flex-md-row">
      <div>
        <Image
          circle
          alt={comment.userId.name}
          src={comment.userId.imageUrl || DefaultUserImage}
        />
      </div>
      <div className="col">
        <div className="text-black-50">
          <span className="h3 mb-0">
            {comment.userId.name}
          </span>
        </div>
        <div className="d-flex flex-column flex-md-row h4 justify-content-between mb-0 text-body">
          <div className="col">
            {comment.text}
          </div>
          <div className="h4 mb-0 text-right">
            {
              (userId === comment.userId._id && userType !== 'guest') && (
                <button
                  type="button"
                  onClick={handleRemove}
                  className="button-invisible mr-3"
                >
                  <FaTrash />
                </button>
              )
            }
            <button
              type="button"
              className="button-invisible mr-3"
              onClick={handleToggleCreateReply}
            >
              <FaReply />
            </button>
            <button
              type="button"
              className="button-invisible mr-3"
              onClick={handleLike}
            >
              {
                liked
                  ? <FaHeart className="text-danger" />
                  : <FiHeart />
              }
            </button>
          </div>
        </div>
        <Replies
          postId={postId}
          commentId={comment._id}
          replies={comment.replies}
        />
        <CreateReply
          postId={postId}
          commentId={comment._id}
          isOpen={createReplyOpen}
        />
      </div>
    </div>
  );
};

Comment.defaultProps = {
  postId: '',
  userId: '',
  userType: '',
  comment: {},
  dispatch: null,
};

Comment.propTypes = {
  postId: PropTypes.string,
  userId: PropTypes.string,
  dispatch: PropTypes.func,
  userType: PropTypes.string,
  comment: PropTypes.instanceOf(Object),
};

const mapStateToProps = (state) => ({
  userId: state.user._id,
  userType: state.user.userType,
});

export default connect(mapStateToProps)(Comment);
