import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";
import { getSearchedMovie, setSearchedMovie } from "../Slices/SearchSlice";

function* FetchData(action) {
  const { query, currentPage } = action.payload;
  const response = yield axios.get(
    `https://api.themoviedb.org/3/search/multi?api_key=${
      import.meta.env.VITE_TMDB_API_KEY
    }&query=${query}&page=${currentPage}`
  );
  yield put(setSearchedMovie(response.data));
}
export function* SearchSaga() {
  yield takeLatest(getSearchedMovie.type, FetchData);
}
