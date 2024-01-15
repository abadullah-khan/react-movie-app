import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";
import {
  getSearchedMovieApi,
  setSearchedMovieApi,
} from "../Slices/SearchSlice";

function* FetchApi(action) {
  const { query, page } = action.payload;
  const response = yield axios.get(
    `https://api.themoviedb.org/3/search/multi?api_key=${
      import.meta.env.VITE_TMDB_API_KEY
    }&query=${query}&page=${page}`
  );
  yield put(setSearchedMovieApi(response.data.results));
}
export function* SearchSaga() {
  yield takeLatest(getSearchedMovieApi.type, FetchApi);
}
