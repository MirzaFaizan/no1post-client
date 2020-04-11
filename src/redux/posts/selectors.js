import { createSelector } from 'reselect';

const postsAndFiltersSelector = ({ posts, filters }) => ({
  posts,
  category: filters.category,
  search: filters.search.toLowerCase(),
});

export const filteredPostSelector = createSelector(
  postsAndFiltersSelector,
  ({ posts, category, search }) => {
    if (category) {
      return posts
        .filter((post) => post.category._id === category)
        .filter((post) => post.description.toLowerCase().includes(search));
    }

    if (search) {
      return posts
        .filter((post) => post.description.toLowerCase().includes(search));
    }

    return [...posts];
  },
);

export default () => 'hello selector';
