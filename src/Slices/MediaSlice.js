import { createSlice } from "@reduxjs/toolkit";

const MediaSlice = createSlice({
  name: "media",
  initialState: {
    data: [],
    isLoading: false,
    currentPage: 1,
    mediaType: null,
  },
  reducers: {
    getMediaData(state, action) {
      state.isLoading = true;
      state.mediaType = action.payload.mediaType;
    },
    setMediaData(state, action) {
      state.isLoading = false;
      state.data.push(...action.payload.results);
      state.data.map((movie) => (movie.mediaType = state.mediaType));
      state.currentPage = action.payload.page + 1;
    },
    resetMediaState(state) {
      state.currentPage = 1;
      state.data = [];
      state.mediaType = null;
    },
  },
});

export const { getMediaData, setMediaData, resetMediaState } =
  MediaSlice.actions;
export default MediaSlice.reducer;
