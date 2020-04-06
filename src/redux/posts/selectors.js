import { createSelector } from 'reselect';

const postsAndFiltersSelector = ({ posts, filters }) => ({
  posts,
  category: filters.category,
});

export const filteredPostSelector = createSelector(
  postsAndFiltersSelector,
  ({ posts, category }) => {
    if (category) {
      return posts.filter((post) => post.category === category);
    }

    return [...posts];
  },
);

export default () => 'hello selector';
