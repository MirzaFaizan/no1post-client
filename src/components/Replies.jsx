import React from 'react';
import PropTypes from 'prop-types';

import Reply from './Reply';

const Replies = ({ replies, commentId, postId, userId }) => (
  <>
    {replies.map((reply) => (
      <Reply
        reply={reply}
        key={reply._id}
        commentId={commentId}
        postId={postId}
      />
    ))}
  </>
);

Replies.defaultProps = {
  replies: [],
  commentId: '',
  postId: '',
};

Replies.propTypes = {
  commentId: PropTypes.string,
  postId: PropTypes.string,
  replies: PropTypes.instanceOf(Array),
};

export default Replies;
