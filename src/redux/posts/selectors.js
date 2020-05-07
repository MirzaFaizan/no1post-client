import { createSelector } from 'reselect';

const postsAndFiltersSelector = ({ posts, filters }) => ({
  posts,
  category: filters.category,
  search: filters.search.toLowerCase(),
});

export const filteredPostSelector = createSelector(
  postsAndFiltersSelector,
  ({ posts, category, search }) => {
    if (category === 'expired') {
      return posts
        .filter((post) => post.expired === true)
        .filter((post) => post.description.toLowerCase().includes(search));
    }

    if (category) {
      return posts
        .filter((post) => post.category._id === category && post.expired === false)
        .filter((post) => post.description.toLowerCase().includes(search));
    }

    if (search) {
      return posts
        .filter((post) => post.description.toLowerCase().includes(search) && post.expired === false);
    }

    return posts.filter((post) => post.expired === false);
  },
);

export default () => 'hello selector';
