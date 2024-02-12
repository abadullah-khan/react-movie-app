import { createSlice } from "@reduxjs/toolkit";

const SearchSlice = createSlice({
  name: "search",
  initialState: {
    query: "",
    isLoading: false,
    currentPage: 1,
    data: [],
    totalPages: 1,
    hasMore: true,
  },
  reducers: {
    handleChange(state, action) {
      state.query = action.payload;
    },
    resetSearchState(state) {
      state.currentPage = 1;
      state.data = [];
      state.totalPages = 1;
      state.hasMore = true;
    },
    getSearchedMovie(state) {
      state.isLoading = true;
    },
    setSearchedMovie(state, action) {
      let { page, results, total_pages } = action.payload;

      state.isLoading = false;
      state.data.push(...results);
      state.data = state.data.map((movie) => ({
        ...movie,
        mediaType: movie.media_type,
      }));
      state.totalPages =
        action.payload.total_pages > 500 ? 500 : action.payload.total_pages;
      state.currentPage = page += 1;
      state.totalPages = total_pages;
      state.hasMore = state.currentPage > total_pages ? false : true;
    },
  },
});
export const {
  handleChange,
  resetSearchState,
  getSearchedMovie,
  setSearchedMovie,
} = SearchSlice.actions;
export default SearchSlice.reducer;
