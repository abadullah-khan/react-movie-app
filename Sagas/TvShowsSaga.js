import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";
import { getTvShowsApi, setTvShowsApi } from "../Slices/TvShowsSlice";

function* FetchApi(action) {
  const response = yield axios.get(
    `https://api.themoviedb.org/3/tv/${action.payload}?api_key=3f6036e41fc244bd77f0e28bc5f2904d&language=en-US`
  );
  yield put(setTvShowsApi(response.data.results));
}
export function* TvShowsSaga() {
  yield takeLatest(getTvShowsApi.type, FetchApi);
}
