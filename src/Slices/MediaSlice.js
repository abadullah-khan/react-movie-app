import { createSlice } from "@reduxjs/toolkit";

const MediaSlice = createSlice({
  name: "media",
  initialState: {
    data: [],
    isLoading: false,
    currentPage: 1,
    mediaType: null,
    totalPages: null,
  },
  reducers: {
    getMediaData(state, action) {
      state.isLoading = true;
      state.mediaType = action.payload.mediaType;
    },
    setMediaData(state, action) {
      state.data = action.payload.results;
      state.data.map((movie) => (movie.mediaType = state.mediaType));
      state.currentPage = action.payload.page;
      state.totalPages =
        action.payload.total_pages > 500 ? 500 : action.payload.total_pages;
      state.isLoading = false;
    },
    setPage(state, action) {
      state.currentPage = action.payload;
    },
    resetMediaState(state) {
      state.currentPage = 1;
      state.data = [];
      state.mediaType = null;
      state.totalPages = null;
    },
  },
});

export const { setPage, getMediaData, setMediaData, resetMediaState } =
  MediaSlice.actions;
export default MediaSlice.reducer;
