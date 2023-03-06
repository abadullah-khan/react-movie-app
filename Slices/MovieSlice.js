import { createSlice } from "@reduxjs/toolkit";

const MovieSlice = createSlice({
  name: "movie",
  initialState: {
    movieDetails: {},
  },
  reducers: {
    getMovieApi(action) {
      return action;
    },
    setMovieApi(state, action) {
      state.movieDetails = action.payload;
    },
  },
});
export const { getMovieApi, setMovieApi } = MovieSlice.actions;
export default MovieSlice.reducer;
