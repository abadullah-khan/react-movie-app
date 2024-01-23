import { all } from "redux-saga/effects";

import { Home_TrendPosterSaga } from "./Home_TrendPosterSaga";
import { Home_TrendingSaga } from "./Home_TrendingSaga";
import { MovieSaga } from "./MovieSaga";
import { MediaSaga } from "./MediaSaga";
import { TvShowsSaga } from "./TvShowsSaga";
import { SearchSaga } from "./SearchSaga";

export function* rootSaga() {
  yield all([
    Home_TrendPosterSaga(),
    Home_TrendingSaga(),
    MovieSaga(),
    MediaSaga(),
    TvShowsSaga(),
    SearchSaga(),
  ]);
}
