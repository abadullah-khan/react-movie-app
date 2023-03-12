import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";
import { getTvShowsApi, setTvShowsApi } from "../Slices/TvShowsSlice";

function* FetchApi(action) {
  const { tvShows_Type, page } = action.payload;
  const response = yield axios.get(
    `https://api.themoviedb.org/3/tv/${tvShows_Type}?api_key=3f6036e41fc244bd77f0e28bc5f2904d&page=${page}`
  );
  yield put(setTvShowsApi(response.data.results));
}
export function* TvShowsSaga() {
  yield takeLatest(getTvShowsApi.type, FetchApi);
}
