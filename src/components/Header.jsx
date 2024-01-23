import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { IoSearchSharp } from "react-icons/io5";

import { handleChange, resetSearchState } from "../Slices/SearchSlice";
import { resetMediaState } from "../Slices/MediaSlice";

export const Header = () => {
  const dispatch = useDispatch();

  const moviesLoading = useSelector((state) => state.media.isLoading);
  const { query, isLoading: search } = useSelector((state) => state.search);

  const [moviesTypeVisible, setMoviesTypeVisible] = useState(false);
  const [seriesTypeVisible, setSeriesTypeVisible] = useState(false);

  const Navigate = useNavigate();

  const onChange = (value) => {
    dispatch(handleChange(value));
  };

  const handleSearch = () => {
    query.trim().length > 0 &&
      (dispatch(resetSearchState()), Navigate("/search"));
  };

  const mediaType = {
    movieTypes: [
      { title: "Popular", path: "/movie/popular" },
      { title: "Now Playing", path: "/movie/now_playing" },
      { title: "Upcoming", path: "/movie/upcoming" },
      { title: "Top Rated", path: "/movie/top_rated" },
    ],
    tvShowTypes: [
      { title: "Popular", path: "/tv/popular" },
      { title: "Airing Today", path: "/tv/on_the_air" },
      { title: "Top Rated", path: "/tv/top_rated" },
    ],
  };

  const handleLink = (path) => {
    dispatch(resetMediaState());
    Navigate(path);
  };
  return (
    <>
      <div className="header">
        <div className="logoContainer">
          <h1>MWM</h1>
          <p>Must Watch Movies</p>
        </div>
        <div className="searchContainer">
          <input
            type="search"
            placeholder="Search..."
            name=""
            id=""
            value={query}
            onChange={(event) => onChange(event.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button onClick={() => handleSearch()} title="Search">
            <IoSearchSharp />
          </button>
        </div>
        <div className="linkContainer">
          <span
            onMouseEnter={() => setMoviesTypeVisible(!moviesTypeVisible)}
            onMouseLeave={() => setMoviesTypeVisible(!moviesTypeVisible)}
          >
            <span>Movies</span>
            {moviesTypeVisible && (
              <ul>
                {mediaType.movieTypes.map((movieType) => (
                  <li
                    onClick={() => handleLink(movieType.path)}
                    key={movieType.title}
                  >
                    {movieType.title}
                  </li>
                ))}
              </ul>
            )}
          </span>
          <span
            onMouseEnter={() => setSeriesTypeVisible(!seriesTypeVisible)}
            onMouseLeave={() => setSeriesTypeVisible(!seriesTypeVisible)}
          >
            <span>TV Shows</span>
            {seriesTypeVisible && (
              <ul>
                {mediaType.tvShowTypes.map((tvShow) => (
                  <li
                    onClick={() => handleLink(tvShow.path)}
                    key={tvShow.title}
                  >
                    {tvShow.title}
                  </li>
                ))}
              </ul>
            )}
          </span>
          <span>
            <Link to="/">Home</Link>
          </span>
        </div>
      </div>
      {(moviesLoading || search) && <BarLoader width={"100%"} color="blue" />}
    </>
  );
};
