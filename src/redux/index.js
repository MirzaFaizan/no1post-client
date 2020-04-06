import {
  createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import ReduxThunk from 'redux-thunk';

import userReducer from './user/reducer';
import postsReducer from './posts/reducer';
import filtersReducer from './filters/reducer';
import authModalReducer from './auth-modal/reducer';
import postModalReducer from './post-modal/reducer';
import categoriesReducer from './categories/reducer';

const middlewares = [
  ReduxThunk,
];

export default () => createStore(
  combineReducers({
    user: userReducer,
    posts: postsReducer,
    filters: filtersReducer,
    authModal: authModalReducer,
    postModal: postModalReducer,
    categories: categoriesReducer,
  }),
  applyMiddleware(...middlewares),
);
