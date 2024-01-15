import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";
import { getMoviesApi, setMoviesApi } from "../Slices/MoviesSlice";

function* FetchApi(action) {
  const { movies_type, page } = action.payload;
  const response = yield axios.get(
    `https://api.themoviedb.org/3/movie/${movies_type}?api_key=${
      import.meta.env.VITE_TMDB_API_KEY
    }&page=${page}`
  );
  yield put(setMoviesApi({ movies: response.data.results }));
}
export function* MoviesSaga() {
  yield takeLatest(getMoviesApi.type, FetchApi);
}
