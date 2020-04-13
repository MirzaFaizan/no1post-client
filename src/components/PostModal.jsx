import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  closePostModal,
} from '../redux/post-modal/actions';
import { ratePost } from '../redux/posts/actions';

import StarRating from './StarRating';

Modal.setAppElement(document.getElementById('root'));

const PostContentModal = ({ dispatch, postModal, rating }) => {
  const [animation, setAnimation] = React.useState('');
  const [averageRating, setAverageRating] = React.useState(0);

  React.useEffect(() => {
    const { length } = rating;
    const ratingSum = rating.reduce((a, r) => a + (r.ratingPoints / 20), 0);

    if (ratingSum <= 0 && length <= 0) {
      setAverageRating(0);
    } else {
      setAverageRating(ratingSum / length);
    }
  }, [rating]);

  const handleOnOpen = () => {
    setAnimation('animation-fade-in');
  };

  const handleCloseModal = () => {
    setAnimation('animation-fade-out');

    setTimeout(() => {
      setAnimation('');
      dispatch(closePostModal());
    }, 450);
  };

  const handleRatePost = (rating) => {
    dispatch(ratePost(postModal._id, rating));
  };

  const {
    image,
    isOpen,
  } = postModal;

  return (
    <Modal
      isOpen={isOpen}
      onAfterOpen={handleOnOpen}
      onRequestClose={handleCloseModal}
      contentLabel="Modal shows post preview"
      className={`react-modal ${animation}`}
    >
      <img
        src={image}
        alt="Will contain text name"
      />
      <div className="text-center">
        <StarRating
          rating={averageRating}
          onChange={handleRatePost}
        />
      </div>
    </Modal>
  );
};

PostContentModal.defaultProps = {
  postModal: {},
  dispatch: null,
};

PostContentModal.propTypes = {
  dispatch: PropTypes.func,
  postModal: PropTypes.instanceOf(Object),
};

const mapStateToProps = ({ posts, postModal }) => {
  let rating = [];
  const post = posts.find((post) => post._id === postModal._id);

  if (post) {
    rating = post.rating;
  }

  return {
    rating,
    postModal,
  };
};

export default connect(mapStateToProps, null)(PostContentModal);
