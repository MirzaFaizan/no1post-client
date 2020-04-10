import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  closePostModal,
} from '../redux/post-modal/actions';

import StarRating from './StarRating';

Modal.setAppElement(document.getElementById('root'));

const PostContentModal = ({ dispatch, postModal }) => {
  const [animation, setAnimation] = React.useState('');

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

  const {
    image,
    isOpen,
    ratings,
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
          rating={ratings ? ratings.length : 0}
          onChange={() => console.log('add')}
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

const mapStateToProps = ({ postModal }) => ({ postModal });

export default connect(mapStateToProps, null)(PostContentModal);
