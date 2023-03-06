import { createSlice } from "@reduxjs/toolkit";

const TvShowsSlice = createSlice({
  name: "tvShows",
  initialState: {
    TvShowsList: [],
  },
  reducers: {
    getTvShowsApi(tvShows_type) {
      return tvShows_type;
    },
    setTvShowsApi(state, action) {
      state.TvShowsList = [];
      state.TvShowsList.push(...action.payload);
      state.TvShowsList.map((i) => (i.media_type = "tv"));
    },
  },
});
export const { getTvShowsApi, setTvShowsApi } = TvShowsSlice.actions;
export default TvShowsSlice.reducer;
