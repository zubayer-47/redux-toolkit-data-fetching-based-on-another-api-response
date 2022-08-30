const { configureStore } = require("@reduxjs/toolkit");
const { default: logger } = require("redux-logger");
const postReducer = require("../post/postSlice");
const {fetchPost} = require("../post/postSlice");
const relatedPostReducer = require("../relatedPost/relatedPostSlice");
const { fetchRelatedPost } = require("../relatedPost/relatedPostSlice");

const store = configureStore({
  reducer: {
    post: postReducer,
    relatedPost: relatedPostReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger,(store) => (next) => (action) => {
      console.log(fetchPost.fulfilled.type);
      if (action.type === fetchPost.fulfilled.type) {
        store.dispatch(fetchRelatedPost(action.payload));
        return next(action);
      }
      return next(action);
    }),
});

module.exports = store;
