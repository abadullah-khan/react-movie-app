import { createSlice } from "@reduxjs/toolkit";

const MoviesSlice = createSlice({
  name: "movies",
  initialState: {
    data: [],
    isLoading: false,
    currentPage: 1,
    media_type: null,
  },
  reducers: {
    getData(state, action) {
      state.isLoading = true;
      state.media_type = action.payload.media_type;
    },
    setData(state, action) {
      state.isLoading = false;
      state.data.push(...action.payload.results);
      state.data.map((movie) => (movie.media_type = state.media_type));
      state.currentPage = action.payload.page + 1;
    },
    resetState(state) {
      state.currentPage = 1;
      state.data = [];
      state.media_type = null;
    },
  },
});

export const { getData, setData, resetState } = MoviesSlice.actions;
export default MoviesSlice.reducer;
