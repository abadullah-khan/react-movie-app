import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";

import { rootSaga } from "./Sagas/rootSaga";
import HomeReducer from "./Slices/HomeSlice";
import MovieReducer from "./Slices/MovieSlice";
import MediaReducer from "./Slices/MediaSlice";
import SearchReducer from "./Slices/SearchSlice";

const sagaMiddleware = createSagaMiddleware();

export const Store = configureStore({
  reducer: {
    home: HomeReducer,
    movie: MovieReducer,
    media: MediaReducer,
    search: SearchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);
