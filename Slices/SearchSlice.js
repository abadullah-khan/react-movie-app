import { createSlice } from "@reduxjs/toolkit";

const SearchSlice = createSlice({
  name: "search",
  initialState: {
    searchedList: [],
  },
  reducers: {
    getSearchedMovieApi(query) {
      return query;
    },
    setSearchedMovieApi(state, action) {
      state.searchedList = [];
      state.searchedList.push(...action.payload);
    },
  },
});
export const { getSearchedMovieApi, setSearchedMovieApi } = SearchSlice.actions;
export default SearchSlice.reducer;
