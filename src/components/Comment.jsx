import React from 'react';
import PropTypes from 'prop-types';
import { FiHeart } from 'react-icons/fi';
import { FaReply } from 'react-icons/fa';

import Image from './Image';
import Replies from './Replies';
import CreateReply from './CreateReply';

const Comment = ({ comment, postId }) => {
  const [createReplyOpen, setCreateReplyOpen] = React.useState(false);

  const handleToggleCreateReply = () => {
    setCreateReplyOpen(!createReplyOpen);
  };

  return (
    <div className="align-items-md-baseline d-flex flex-column flex-md-row">
      <div>
        <Image
          circle
          src={comment.userId.imageUrl}
          alt={comment.userId.name}
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
            <button
              type="button"
              className="button-invisible mr-3"
              onClick={handleToggleCreateReply}
            >
              <FaReply />
            </button>
            <span>
              <FiHeart />
            </span>
          </div>
        </div>
        <Replies
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
  comment: {},
};

Comment.propTypes = {
  postId: PropTypes.string,
  comment: PropTypes.instanceOf(Object),
};

export default Comment;
