import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AllSummary_API } from "../api/AllSummaryApi";

export const fetchDashboardStats = createAsyncThunk(
  "fetch/dashboard",
  async (_,{ rejectWithValue }) => {
    try {
      const response = await axios({
        url: AllSummary_API.authorDashboard.url,
        method: AllSummary_API.authorDashboard.method,
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch dashbaord",
      );
    }
  },
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    stats: {
      totalPosts: 0,
      published: 0,
      draft: 0,
      totalViews: 0,
    },
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
       
        state.stats = action.payload;
         state.loading = false;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
