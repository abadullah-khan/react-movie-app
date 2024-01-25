import { createSlice } from "@reduxjs/toolkit";

const HomeSlice = createSlice({
  name: "home",
  initialState: {
    trendPosterList: [],
    trendingList: [],
    latestTrailerList: [],
  },
  reducers: {
    getTrendPosterApi() {},
    setTrendPosterApi(state, action) {
      state.trendPosterList = action.payload.results
        .filter((result) => result.vote_average > 8)
        .slice(0, 5);
    },
    getTrendingApi(action) {
      return action;
    },
    setTrendingApi(state, action) {
      state.trendingList = [];
      state.trendingList.push(...action.payload.results);
    },
  },
});

export const {
  getTrendPosterApi,
  setTrendPosterApi,
  getTrendingApi,
  setTrendingApi,
} = HomeSlice.actions;
export default HomeSlice.reducer;
