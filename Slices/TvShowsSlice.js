import { createSlice } from "@reduxjs/toolkit";

const TvShowsSlice = createSlice({
  name: "tvShows",
  initialState: {
    TvShowsList: [],
    isLoading: false,
    page: 1,
  },
  reducers: {
    getTvShowsApi(state) {
      state.isLoading = true;
    },
    setTvShowsApi(state, action) {
      state.isLoading = false;
      state.TvShowsList.push(...action.payload);
      state.TvShowsList.map((tvShow) => (tvShow.media_type = "tv"));
      state.page += 1;
    },
    resetState(state) {
      state.page = 1;
      state.TvShowsList = [];
    },
  },
});
export const { getTvShowsApi, setTvShowsApi, resetState } =
  TvShowsSlice.actions;
export default TvShowsSlice.reducer;
