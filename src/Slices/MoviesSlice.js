import { createSlice } from "@reduxjs/toolkit";

const MoviesSlice = createSlice({
  name: "movies",
  initialState: {
    MoviesList: [],
    isLoading: false,
    page: 1,
  },
  reducers: {
    getMoviesApi(state) {
      state.isLoading = true;
    },
    setMoviesApi(state, action) {
      state.isLoading = false;
      state.MoviesList.push(...action.payload.movies);
      state.MoviesList.map((movie) => (movie.media_type = "movie"));
      state.page += 1;
    },
    resetState(state) {
      state.page = 1;
      state.MoviesList = [];
    },
  },
});

export const { getMoviesApi, setMoviesApi, resetState } = MoviesSlice.actions;
export default MoviesSlice.reducer;
