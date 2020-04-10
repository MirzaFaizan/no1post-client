import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  FaComment,
  FaShareSquare,
} from 'react-icons/fa';

import Image from './Image';
import Comments from './Comments';
import StarRating from './StarRating';
import notification from './notifications';

import { openPostModal } from '../redux/post-modal/actions';

const Post = ({ post }) => {
  const dispatch = useDispatch();

  const [commentsOpen, setCommentsOpen] = React.useState(false);

  const handlePreview = () => {
    dispatch(openPostModal(post.mediaUrl, post.ratings));
  };

  const handleToggleComments = () => {
    setCommentsOpen(!commentsOpen);
  };

  const handleShare = () => {
    window.navigator.clipboard.writeText(`${window.location.origin}/?post=${post._id}`);
    notification.success('Link Copied', 'Link for the post was successfully copied to your clipboard!');
  };

  const displayMedia = () => {
    if (post.mediaType === 'audio') {
      return (
        // <audio
        //   controls
        //   className="filter-drop-shadow-gray h-100 w-100"
        // >
        //   <source src={post.mediaUrl} type="audio/mp3" />
        // </audio>
        <audio
          controls
          src={post.mediaUrl}
        />
      );
    }

    if (post.mediaType === 'video') {
      return (
        <video
          controls
          className="filter-drop-shadow-gray h-100 w-100"
        >
          <source src={post.mediaUrl} />
        </video>
      );
    }

    return (
      <button
        type="button"
        onClick={handlePreview}
        className="button-invisible d-block w-100"
      >
        <Image
          rounded
          src={post.mediaUrl}
          alt="Will contain some text"
          className="filter-drop-shadow-gray media__image img-fluid"
        />
      </button>
    );
  };

  return (
    <>
      <div id={`post-${post._id}`} className="bg-white custom-rounded-2rem mt-4 p-4 custom-card">
        <div className="align-items-center align-items-md-baseline d-flex flex-column flex-md-row">
          <div>
            <Image
              circle
              alt="User"
              width="70px"
              height="70px"
              src={post.postBy.imageUrl}
            />
          </div>
          <div className="col text-center text-md-left">
            <div className="d-flex flex-column flex-md-row justify-content-between py-2 py-md-0 text-black-50">
              <span className="h3 mb-0">
                {post.postBy.name}
              </span>
              <span className="d-flex flex-column">
                <small>
                  Posted At: {new Date(post.createdAt).toDateString().substring(4)}
                </small>
                <span className="h4 mb-0">
                  Posted For {post.postRate}$
                </span>
              </span>
            </div>
            <div className="h4 pb-2 pb-md-0 text-body">
              {post.description}
            </div>
          </div>
        </div>
        <div className="pt-4 media">
          {displayMedia()}
        </div>
        <div className="align-items-center flex-column-reverse flex-md-row justify-content-between mx-0 mx-md-4 pt-2 row">
          <button
            type="button"
            onClick={handleToggleComments}
            className="d-flex align-items-center custom-gray-color h2 mb-0"
          >
            <FaComment />
            <span className="ml-2">
              {post.comments.length}
            </span>
          </button>
          <div className="d-flex align-items-center">
            <button
              type="button"
              onClick={handleShare}
              className="custom-gray-color h2 mb-0 mr-2"
            >
              <FaShareSquare />
            </button>
            <span>
              <StarRating
                rating={post.ratings.length}
                onChange={() => console.log('add rating')}
              />
            </span>
          </div>
        </div>
      </div>
      <Comments
        postId={post._id}
        isOpen={commentsOpen}
        comments={post.comments}
      />
    </>
  );
};

Post.defaultProps = {
  post: {},
};

Post.propTypes = {
  post: PropTypes.instanceOf(Object),
};

export default Post;
