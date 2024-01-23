import React, { lazy, Suspense } from "react";
import { Provider, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Store } from "./Store";
// import { Home, Header, Movie,Movies TvShows } from "./Constants";
import { Trending } from "./components/home/components/Trending";

import "./movieApp.scss";
import "./styles/header.scss";
import "./styles/home.scss";
import "./styles/trending.scss";
import "./styles/card.scss";
import "./styles/movie.scss";
import "./styles/movies.scss";
import "./styles/tvShows.scss";
import "./styles/search.scss";
import "./styles/videoCard.scss";
import { Search } from "./components/Search";

const Header = lazy(() =>
  import("./components/Header").then((module) => ({ default: module.Header }))
);
const Home = lazy(() =>
  import("./components/home/Home").then((module) => ({ default: module.Home }))
);
const Movie = lazy(() =>
  import("./components/movie/Movie").then((module) => ({
    default: module.Movie,
  }))
);
const Media = lazy(() =>
  import("./components/movies/Media").then((module) => ({
    default: module.Media,
  }))
);

export const MovieApp = () => {
  return (
    <Provider store={Store}>
      <BrowserRouter>
        <>
          <Header />
          <Suspense fallback={<div>Wait im being loaded</div>}>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="search" element={<Search />} />
              <Route path="movie/:media_type/:id" element={<Movie />} />
              <Route path="/:media_type/:movies_type" element={<Media />} />
            </Routes>
          </Suspense>
        </>
      </BrowserRouter>
    </Provider>
  );
};
