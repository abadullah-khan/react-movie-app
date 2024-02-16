import { createSlice } from "@reduxjs/toolkit";

const HomeSlice = createSlice({
  name: "home",
  initialState: {
    trendPosterList: [],
    trendingList: [],
    isLoading: false,
    latestTrailers: [],
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
    getTrendingApi(state) {
      state.isLoading = true;
    },
    setTrendingApi(state, action) {
      state.trendingList = [];
      state.trendingList.push(...action.payload.results);
      state.trendingList = state.trendingList.map((movie) => ({
        ...movie,
        mediaType: movie.media_type,
      }));
    },
    getLatestTrailers(state) {
      state.isLoading = true;
    },
    setLatestTrailers(state, action) {
      state.latestTrailers = [];
      state.latestTrailers = [...action.payload];
      state.isLoading = false;
    },
  },
});

export const {
  getTrendPosterApi,
  setTrendPosterApi,
  getTrendingApi,
  setTrendingApi,
  getLatestTrailers,
  setLatestTrailers,
} = HomeSlice.actions;
export default HomeSlice.reducer;
