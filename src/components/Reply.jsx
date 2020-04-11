import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, connect } from 'react-redux';

import Image from './Image';

import { removeReply } from '../redux/posts/actions';
import { FaTrash } from 'react-icons/fa';

const Reply = ({
  reply,
  postId,
  commentId,
  userId,
  userType,
}) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeReply(postId, commentId, reply._id));
  };

  return (
    <div className="align-items-baseline ml-2 ml-md-0 mt-md-4 mx-xl-3 row">
      <div>
        <Image
          circle
          src={reply.userId.imageUrl}
          alt={reply.userId.name}
        />
      </div>
      <div className="pl-3 flex-grow-1">
        <div className="text-black-50 d-flex justify-content-between">
          <span className="h3 mb-0">
            {reply.userId.name}
          </span>
          {
            (userId === reply.userId._id && userType !== 'guest') && (
              <button
                type="button"
                onClick={handleRemove}
                className="button-invisible"
              >
                <FaTrash />
              </button>
            )
          }
        </div>
        <div className="d-flex h4 justify-content-between mb-0 pl-2 pl-md-0 text-body">
          <span>
            {reply.text}
          </span>
        </div>
      </div>
    </div>
  );
};

Reply.defaultProps = {
  reply: {},
  commentId: '',
  postId: '',
  userId: '',
  userType: '',
};

Reply.propTypes = {
  reply: PropTypes.instanceOf(Object),
  commentId: PropTypes.string,
  postId: PropTypes.string,
  userId: PropTypes.string,
};

const mapStateToProps = (state) => ({
  userId: state.user._id,
  userType: state.user.userType,
});

export default connect(mapStateToProps)(Reply);
