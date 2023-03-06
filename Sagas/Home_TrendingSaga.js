import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

import { getTrendingApi, setTrendingApi } from "../Slices/HomeSlice";

function* fetchApi(action) {
  const { time_window, media_type } = action.payload;
  const response = yield axios.get(
    `https://api.themoviedb.org/3/trending/${media_type ? media_type : "all"}/${
      time_window ? time_window : "day"
    }?api_key=3f6036e41fc244bd77f0e28bc5f2904d&language=en-US&page=1`
  );
  yield put(setTrendingApi(response.data));
}

export function* Home_TrendingSaga() {
  yield takeLatest(getTrendingApi.type, fetchApi);
}
