import { createSlice } from "@reduxjs/toolkit";

const SearchSlice = createSlice({
  name: "search",
  initialState: {
    query: "",
    isLoading: false,
    page: 1,
    searchedList: [],
    totalPages: 1,
    hasMore: true,
  },
  reducers: {
    onChange(state, action) {
      state.query = action.payload;
    },
    resetState(state) {
      state.page = 1;
      state.searchedList = [];
      state.totalPages = 1;
      state.hasMore = true;
    },
    getSearchedMovieApi(state) {
      state.isLoading = true;
    },
    setSearchedMovieApi(state, action) {
      let { page, results, total_pages } = action.payload;

      state.isLoading = false;
      state.searchedList.push(...results);
      state.page = page += 1;
      state.totalPages = total_pages;
      state.hasMore = state.page > total_pages ? false : true;
    },
  },
});
export const {
  onChange,
  resetState,
  getSearchedMovieApi,
  setSearchedMovieApi,
} = SearchSlice.actions;
export default SearchSlice.reducer;
