import { createSlice } from "@reduxjs/toolkit";

const HomeSlice = createSlice({
  name: "home",
  initialState: {
    trendPosterList: [],
    trendingList: [],
    latestTrailerList: [],
    isLoading: false,
  },
  reducers: {
    getTrendPosterApi(state) {
      state.isLoading = true;
    },
    setTrendPosterApi(state, action) {
      state.trendPosterList = action.payload.results
        .filter((result) => result.vote_average > 8)
        .slice(0, 5);
      state.isLoading = false;
    },
    getTrendingApi(action) {
      return action;
    },
    setTrendingApi(state, action) {
      state.trendingList = [];
      state.trendingList.push(...action.payload.results);
      state.trendingList = state.trendingList.map((movie) => ({
        ...movie,
        mediaType: movie.media_type,
      }));
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
