import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Store } from "./Store";
import { Home, Header, Movie, Movies, TvShows } from "./Constants";
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

export const MovieApp = () => {
  return (
    <Provider store={Store}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="movie/:media_type/:id" element={<Movie />} />
          <Route path="movies/:movies_type" element={<Movies />} />
          <Route path="tvShows/:tvShows_Type" element={<TvShows />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};
