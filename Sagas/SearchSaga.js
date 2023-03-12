import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";
import {
  getSearchedMovieApi,
  setSearchedMovieApi,
} from "../Slices/SearchSlice";

function* FetchApi(action) {
  const { query, page } = action.payload;
  const response = yield axios.get(
    `https://api.themoviedb.org/3/search/multi?api_key=3f6036e41fc244bd77f0e28bc5f2904d&query=${query}&page=${page}`
  );
  yield put(setSearchedMovieApi(response.data.results));
}
export function* SearchSaga() {
  yield takeLatest(getSearchedMovieApi.type, FetchApi);
}
