import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";
import { getData, setData } from "../Slices/MediaSlice";

function* FetchData(action) {
  const { media_type, movies_type, currentPage } = action.payload;
  const response = yield axios.get(
    `https://api.themoviedb.org/3/${media_type}/${movies_type}?api_key=${
      import.meta.env.VITE_TMDB_API_KEY
    }&page=${currentPage}`
  );
  yield put(setData(response.data));
}
export function* MediaSaga() {
  yield takeLatest(getData.type, FetchData);
}
