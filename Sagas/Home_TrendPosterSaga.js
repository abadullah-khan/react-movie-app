import { takeLatest, put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import { getTrendPosterApi, setTrendPosterApi } from "../Slices/HomeSlice";

function* FetchApi() {
  const response = yield axios.get(
    "https://api.themoviedb.org/3/trending/all/week?api_key=3f6036e41fc244bd77f0e28bc5f2904d&language=en-US&page=1"
  );
  yield put(setTrendPosterApi(response.data));
}

export function* Home_TrendPosterSaga() {
  yield takeLatest(getTrendPosterApi, FetchApi);
}
