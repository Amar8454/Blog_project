import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authors: [],
  singleAuthor: null,
  isLoading: true,
  authorPost: [],
};

const authorSlice = createSlice({
  name: "authors",
  initialState,
  reducers: {
    AuthorRequest: (state) => {
      state.isLoading = true;
    },

    // All author
    AuthorLogin: (state, action) => {
      state.authors = action.payload;
      state.isLoading = false;
    },

    // SingleAuthor
    FetchSingleAuthor: (state, action) => {
      state.singleAuthor = action.payload;
      state.isLoading = false;
    },

    FetchAuthorPost: (state, action) => {
      state.authorPost = action.payload;
      state.isLoading = false;
    },

    AuthorFail: (state) => {
      state.isLoading = false;
    },
  },
});

export const {
  AuthorLogin,
  FetchAuthorPost,
  FetchSingleAuthor,
  AuthorRequest,
  AuthorFail,
} = authorSlice.actions;
export default authorSlice.reducer;
