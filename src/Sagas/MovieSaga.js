import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

import { getMovieApi, setMovieApi } from "../Slices/MovieSlice";

function* FetchApi(action) {
  const { mediaType, id } = action.payload;
  const response = yield axios.get(
    `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${
      import.meta.env.VITE_TMDB_API_KEY
    }&language=en-US&append_to_response=credits,images,videos,recommendations,keywords`
  );
  yield put(setMovieApi(response.data));
}

export function* MovieSaga() {
  yield takeLatest(getMovieApi.type, FetchApi);
}
