import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feature/authSlice.js";
import themeReducer from "../feature/themeSlice.js";
import postReducer from "../feature/productSlice.js";
import authorReducer from "../feature/authorSlice.js";
import dashboardSlice from "../feature/authorDashbaord.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    posts: postReducer,
    authors: authorReducer,
    dashboard: dashboardSlice,
  },
});
