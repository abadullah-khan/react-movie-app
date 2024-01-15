import { takeLatest, put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import { getTrendPosterApi, setTrendPosterApi } from "../Slices/HomeSlice";

function* FetchApi() {
  const response = yield axios.get(
    `https://api.themoviedb.org/3/trending/all/week?api_key=${
      import.meta.env.VITE_TMDB_API_KEY
    }&language=en-US&page=1`
  );
  yield put(setTrendPosterApi(response.data));
}

export function* Home_TrendPosterSaga() {
  yield takeLatest(getTrendPosterApi, FetchApi);
}
