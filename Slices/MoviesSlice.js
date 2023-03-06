import { createSlice } from "@reduxjs/toolkit";

const MoviesSlice = createSlice({
  name: "movies",
  initialState: {
    MoviesList: [],
  },
  reducers: {
    getMoviesApi(movies_type) {
      return movies_type;
    },
    setMoviesApi(state, action) {
      // state.MoviesList = [];
      state.MoviesList.push(...action.payload.movies);
      state.MoviesList.map((movie) => (movie.media_type = "movie"));
    },
    resetState(state) {
      state.MoviesList = [];
    },
  },
});

export const { getMoviesApi, setMoviesApi, resetState } = MoviesSlice.actions;
export default MoviesSlice.reducer;
