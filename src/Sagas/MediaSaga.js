import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";
import { getMediaData, setMediaData } from "../Slices/MediaSlice";

function* FetchData(action) {
  const { mediaType, contentType, currentPage } = action.payload;
  const response = yield axios.get(
    `https://api.themoviedb.org/3/${mediaType}/${contentType}?api_key=${
      import.meta.env.VITE_TMDB_API_KEY
    }&page=${currentPage}`
  );
  yield put(setMediaData(response.data));
}
export function* MediaSaga() {
  yield takeLatest(getMediaData.type, FetchData);
}
