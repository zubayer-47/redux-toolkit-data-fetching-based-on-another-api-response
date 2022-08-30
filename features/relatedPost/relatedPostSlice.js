const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const { default: fetch } = require("node-fetch");

const initialState = {
  loading: false,
  relatedPosts: [],
  error: "",
};

// fetchRelatedPost async thunk function
const fetchRelatedPost = createAsyncThunk("post/relatedPostFetch", async (payload) => {
  const queryParameters = payload.title.split(" ")
    .map((item) => `title_like=${item}`)
    .join("&");

  console.log(queryParameters);

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?${queryParameters}`
  );
  const data = await response.json();

  return data;
});

const relatedPostsSlice = createSlice({
  name: "relatedPosts",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchRelatedPost.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(fetchRelatedPost.fulfilled, (state, action) => {
      state.loading = false;
      state.relatedPosts = action.payload;
      state.error = "";
    });

    builder.addCase(fetchRelatedPost.rejected, (state, action) => {
      state.loading = false;
      state.relatedPosts = [];
      state.error = action.error.message;
    });
  },
});

module.exports = relatedPostsSlice.reducer;
module.exports.relatedPostsActions = relatedPostsSlice.actions;
module.exports.fetchRelatedPost = fetchRelatedPost;
