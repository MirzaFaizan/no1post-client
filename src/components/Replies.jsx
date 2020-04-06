import React from 'react';
import PropTypes from 'prop-types';

import Reply from './Reply';

const Replies = ({ replies, commentId }) => (
  <>
    {replies.map((reply) => (
      <Reply
        reply={reply}
        key={reply._id}
        commentId={commentId}
      />
    ))}
  </>
);

Replies.defaultProps = {
  replies: [],
  commentId: '',
};

Replies.propTypes = {
  commentId: PropTypes.string,
  replies: PropTypes.instanceOf(Array),
};

export default Replies;
