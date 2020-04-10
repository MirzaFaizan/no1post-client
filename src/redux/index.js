import {
  applyMiddleware,
  compose,
  createStore,
  combineReducers,
} from 'redux';
import ReduxThunk from 'redux-thunk';

import adminReducer from './admin/reducer';
import userReducer from './user/reducer';
import postsReducer from './posts/reducer';
import filtersReducer from './filters/reducer';
import postRateReducer from './post-rate/reducer';
import authModalReducer from './auth-modal/reducer';
import postModalReducer from './post-modal/reducer';
import categoriesReducer from './categories/reducer';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const middlewares = composeEnhancers(applyMiddleware(...[
  ReduxThunk,
]));

export default () => createStore(
  combineReducers({
    admin: adminReducer,
    user: userReducer,
    posts: postsReducer,
    filters: filtersReducer,
    postRate: postRateReducer,
    authModal: authModalReducer,
    postModal: postModalReducer,
    categories: categoriesReducer,
  }),
  middlewares,
);
