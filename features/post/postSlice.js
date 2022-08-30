const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const { default: fetch } = require("node-fetch");

const initialState = {
  loading: false,
  post: {},
  error: "",
};

// post async thunk function
const fetchPost = createAsyncThunk("post/postFetch", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/5");
  const data = await response.json();

  return data;
});

const postSlice = createSlice({
  name: "post",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchPost.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(fetchPost.fulfilled, (state, action) => {
      state.loading = false;
      state.post = action.payload;
      state.error = "";
    });

    builder.addCase(fetchPost.rejected, (state, action) => {
      state.loading = false;
      state.post = {};
      state.error = action.error.message;
    });
  },
});

module.exports = postSlice.reducer;
module.exports.postActions = postSlice.actions;
module.exports.fetchPost = fetchPost;
