import { createSlice } from "@reduxjs/toolkit";

const SearchSlice = createSlice({
  name: "search",
  initialState: {
    searchedList: [],
    page: 1,
    query: "",
  },
  reducers: {
    onChange(state, action) {
      state.query = action.payload;
    },
    getSearchedMovieApi() {},
    setSearchedMovieApi(state, action) {
      state.searchedList = [];
      state.searchedList.push(...action.payload);
      state.page += 1;
    },
  },
});
export const { onChange, getSearchedMovieApi, setSearchedMovieApi } =
  SearchSlice.actions;
export default SearchSlice.reducer;
