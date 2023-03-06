import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getSearchedMovieApi } from "../Slices/SearchSlice";
// import { clearingList } from "../Slices/MoviesSlice";

const Header = () => {
  const dispatch = useDispatch();
  // const { MoviesList } = useSelect((state) => state.movies);
  const [query, setQuery] = useState("");
  const [moviesTypeVisible, setMoviesTypeVisible] = useState(false);
  const [seriesTypeVisible, setSeriesTypeVisible] = useState(false);
  useEffect(() => {
    dispatch(getSearchedMovieApi(query));
  }, [query]);

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
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <div className="linkContainer">
          <span
            onMouseEnter={() => setMoviesTypeVisible(!moviesTypeVisible)}
            onMouseLeave={() => setMoviesTypeVisible(!moviesTypeVisible)}
          >
            <span>Movies</span>
            {moviesTypeVisible && (
              <ul>
                <li>
                  <Link to="/movies/popular">Popular</Link>
                </li>
                <li>
                  <Link to="/movies/now_playing">Now Playing </Link>
                </li>
                <li>
                  <Link to="/movies/upcoming">Upcoming</Link>
                </li>
                <li>
                  <Link to="/movies/top_rated">Top Rated</Link>
                </li>
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
                <li>
                  <Link to="/tvShows/popular">Popular</Link>
                </li>
                <li>
                  <Link to="/tvShows/on_the_air">Airing Today</Link>
                </li>
                <li>
                  <Link to="/tvShows/top_rated">Top Rated</Link>
                </li>
              </ul>
            )}
          </span>
          <span>
            <Link to="/">Home</Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default Header;
