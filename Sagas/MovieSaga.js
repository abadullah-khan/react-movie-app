import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

import { getMovieApi, setMovieApi } from "../Slices/MovieSlice";

function* FetchApi(action) {
  const { media_type, id } = action.payload;
  const response = yield axios.get(
    `https://api.themoviedb.org/3/${media_type}/${id}?api_key=3f6036e41fc244bd77f0e28bc5f2904d&language=en-US&append_to_response=credits,images,videos,recommendations,keywords`
  );
  yield put(setMovieApi(response.data));
}

export function* MovieSaga() {
  yield takeLatest(getMovieApi.type, FetchApi);
}
