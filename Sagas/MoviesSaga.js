import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";
import { getMoviesApi, setMoviesApi } from "../Slices/MoviesSlice";

function* FetchApi(action) {
  const { movies_type, page } = action.payload;
  const response = yield axios.get(
    `https://api.themoviedb.org/3/movie/${movies_type}?api_key=3f6036e41fc244bd77f0e28bc5f2904d&page=${page}`
  );
  yield put(setMoviesApi({ movies: response.data.results }));
}
export function* MoviesSaga() {
  yield takeLatest(getMoviesApi.type, FetchApi);
}
