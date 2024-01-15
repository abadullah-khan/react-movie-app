import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";
import { getTvShowsApi, setTvShowsApi } from "../Slices/TvShowsSlice";

function* FetchApi(action) {
  const { tvShows_Type, page } = action.payload;
  const response = yield axios.get(
    `https://api.themoviedb.org/3/tv/${tvShows_Type}?api_key=${
      import.meta.env.VITE_TMDB_API_KEY
    }&page=${page}`
  );
  yield put(setTvShowsApi(response.data.results));
}
export function* TvShowsSaga() {
  yield takeLatest(getTvShowsApi.type, FetchApi);
}
