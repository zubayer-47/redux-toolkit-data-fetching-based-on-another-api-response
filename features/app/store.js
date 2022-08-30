const { configureStore } = require("@reduxjs/toolkit");
const { default: logger } = require("redux-logger");
const postReducer = require("../post/postSlice");
const relatedPostReducer = require("../relatedPost/relatedPostSlice");
const { fetchRelatedPost } = require("../relatedPost/relatedPostSlice");

const store = configureStore({
  reducer: {
    post: postReducer,
    relatedPost: relatedPostReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger, (store) => (next) => (action) => {
      if (action.type === "post/postFetch/fulfilled") {
        store.dispatch(fetchRelatedPost(action.payload));
        return next(action);
      }
      return next(action);
    }),
});

module.exports = store;
