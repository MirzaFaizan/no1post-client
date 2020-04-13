import {
  ADD_POST,
  EDIT_POST,
  INIT_POSTS,
  REMOVE_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
  ADD_REPLY,
  REMOVE_REPLY,
  RATE_POST,
} from './types';

const initState = [];

export default (state = [...initState], { type, payload }) => {
  switch (type) {
    case ADD_POST:
      return [
        payload,
        ...state,
      ];
    case EDIT_POST:
      return state.map((post) => (
        post._id === payload.id
          ? { ...post, ...payload.post }
          : { ...post }
      ));
    case INIT_POSTS:
      return [...payload];
    case REMOVE_POST:
      return state.filter(({ _id }) => _id !== payload);

    // Post Comments
    case ADD_COMMENT:
      return state.map((post) => (
        post._id === payload.postId
          ? {
            ...post,
            comments: [
              ...post.comments,
              payload.comment,
            ],
          }
          : { ...post }
      ));
    case REMOVE_COMMENT:
      return state.map((post) => (
        post._id === payload.postId
          ? {
            ...post,
            comments: post.comments.filter((comment) => comment._id !== payload.commentId)
          }
          : { ...post }
      ));
    // Post Replies
    case ADD_REPLY:
      return state.map((post) => (
        post._id === payload.postId
          ? {
            ...post,
            comments: post.comments.map((comment) => (
              comment._id === payload.commentId
                ? {
                  ...comment,
                  replies: [
                    ...comment.replies,
                    payload.reply,
                  ],
                }
                : { ...comment }
            )),
          }
          : { ...post }
      ));
    case REMOVE_REPLY:
      return state.map((post) => (
        post._id === payload.postId
          ? {
            ...post,
            comments: post.comments.map((comment) => (
              comment._id === payload.commentId
                ? {
                  ...comment,
                  replies: comment.replies.filter((reply) => reply._id !== payload.replyId),
                }
                : { ...comment }
            )),
          }
          : { ...post }
      ));

    case RATE_POST:
      // rating: { ratingPoints: 60, _id: "someId" }

      const found = state.some((post) => {
        if (post._id === payload.postId) {
          return post.rating.some((rating) => {
            if (rating._id === payload.rating._id) {
              return true;
            }

            return false;
          });
        }

        return false;
      });

      if (found) {
        return state.map((post) => (
          post._id === payload.postId
            ? {
              ...post,
              rating: post.rating.map((rating) => (
                rating._id === payload.rating._id
                  ? {
                    ...rating,
                    ratingPoints: payload.rating.ratingPoints,
                  }
                  : { ...rating }
              ))
            }
            : { ...post }
        ));
      }

      return state.map((post) => (
        post._id === payload.postId
          ? {
            ...post,
            rating: [
              ...post.rating,
              { ...payload.rating },
            ]
          }
          : { ...post }
      ));
    default:
      return state;
  }
};
