import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMovieApi } from "../../Slices/MovieSlice";
import { CiPlay1 } from "react-icons/ci";
import { RxOpenInNewWindow } from "react-icons/rx";
import { FaStar } from "react-icons/fa";
import Cast from "./components/Cast";
import Videos from "./components/Videos";
import Recommended from "./components/Recommended";

export const Movie = () => {
  const dispatch = useDispatch();
  const { id, mediaType } = useParams();
  useEffect(() => {
    dispatch(getMovieApi({ id, mediaType }));
  }, [id, mediaType]);

  const movie = useSelector((state) => state.movie);
  const { movieDetails } = movie;
  const [isPresent, setIsPresent] = useState(false);
  useEffect(() => {
    if (movieDetails && movieDetails.id) {
      setIsPresent(true);
    }
  }, [movieDetails]);

  const runTime = (data) => {
    const hours = Math.floor(data / 60);
    const minutes = data % 60;
    return `${hours}hr ${minutes > 0 ? `${minutes}min` : ""}`;
  };

  const handleWatchTrailer = () => {
    const trailer = movieDetails.videos.results.find(
      (video) => video.type === "Trailer"
    );
    window.open(`https://www.youtube.com/watch?v=${trailer.key}`);
  };
  const handleIMDBApp = () => {
    window.open(`https://www.imdb.com/title/${movieDetails.imdb_id}`);
  };
  return (
    <>
      {isPresent && movieDetails.id ? (
        <div className="movieDetailContainer">
          <img
            src={`https://image.tmdb.org/t/p/original${
              movieDetails.backdrop_path
                ? movieDetails.backdrop_path
                : movieDetails.poster_path
            }`}
            alt=""
            className="backdropImg"
          />
          <div className="overlay">
            <img
              src={`https://image.tmdb.org/t/p/original${
                movieDetails.poster_path
                  ? movieDetails.poster_path
                  : movieDetails.backdrop_path
              }`}
              alt=""
              className="posterImg"
            />
            <div className="summary">
              <div className="titleContainer">
                <h2 className="title">
                  {movieDetails.title ? movieDetails.title : movieDetails.name}
                  <span>
                    (
                    {movieDetails.release_date
                      ? movieDetails.release_date.slice(0, 4)
                      : movieDetails.first_air_date.slice(0, 4)}
                    )
                  </span>
                </h2>
                <div className="keyDetails">
                  <p>
                    Rating :-
                    <span>
                      {movieDetails.vote_average.toFixed(1)}
                      <FaStar />
                    </span>
                  </p>
                  |
                  <p>
                    Release-date :-
                    <span>
                      {movieDetails.release_date
                        ? movieDetails.release_date
                        : movieDetails.first_air_date}
                      ({movieDetails.production_countries[0].iso_3166_1})
                    </span>
                  </p>
                  |
                  <p>
                    Run-time :-
                    <span>
                      {runTime(
                        movieDetails.runtime
                          ? movieDetails.runtime
                          : movieDetails.episode_run_time.map((time) => time)
                      )}
                    </span>
                  </p>
                </div>
              </div>
              <div className="tagline">{movieDetails.tagline}</div>
              <div className="genres">
                {movieDetails.genres.map((genre) => (
                  <span id={genre.id}>{genre.name}</span>
                ))}
              </div>
              <div className="overview">
                Overview
                <p>{movieDetails.overview}</p>
              </div>
              <div className="btnContainer">
                <button onClick={() => handleWatchTrailer()}>
                  <CiPlay1 />
                  Play Trailer
                </button>
                <button onClick={() => handleIMDBApp()}>
                  <RxOpenInNewWindow />
                  IMDB Link
                </button>
              </div>
            </div>
          </div>
          <div className="detailsContainer">
            <div className="scrolls">
              <Cast movieDetails={movieDetails} />
              <hr />
              <Videos movieDetails={movieDetails} />
              <hr />
              {movieDetails.recommendations.results.length > 0 && (
                <Recommended movieDetails={movieDetails} />
              )}
            </div>
            <aside>
              <div className="extraKeyDetailsContainer">
                <div className="extraKeyDetails">
                  <span>Status</span>
                  <span>{movieDetails.status}</span>
                </div>
                {movieDetails.networks ? (
                  <div className="extraKeyDetails">
                    <span>Network</span>
                    {movieDetails.networks.map((network) => (
                      <span> {network.name}</span>
                    ))}
                  </div>
                ) : (
                  ""
                )}
                {movieDetails.type ? (
                  <div className="extraKeyDetails">
                    <span>Type</span>
                    <span>{movieDetails.type}</span>
                  </div>
                ) : (
                  ""
                )}
                <div className="extraKeyDetails">
                  <span>Original Language</span>
                  <span>{movieDetails.original_language}</span>
                </div>
                {movieDetails.budget ? (
                  <div className="extraKeyDetails">
                    <span>Budget</span>
                    <span>{movieDetails.budget}</span>
                  </div>
                ) : (
                  ""
                )}
                {movieDetails.revenue ? (
                  <div className="extraKeyDetails">
                    <span>Revenue</span>
                    <span>{movieDetails.revenue}</span>
                  </div>
                ) : (
                  ""
                )}
                <div className="extraKeyDetails">
                  <span>Keywords</span>
                  <span>
                    {movieDetails.keywords.keywords
                      ? movieDetails.keywords.keywords.map((keyword) => (
                          <p>{keyword.name}</p>
                        ))
                      : movieDetails.keywords.results.map((keyword) => (
                          <p>{keyword.name}</p>
                        ))}
                  </span>
                </div>
              </div>
              <hr />
              {movieDetails.belongs_to_collection ? (
                <div className="belongingContainer">
                  <div className="imgContainer">
                    <img
                      src={`https://image.tmdb.org/t/p/original${movieDetails.belongs_to_collection.backdrop_path}`}
                      alt=""
                    />
                  </div>
                  <div className="overlay">
                    <div className="title">
                      Part of the {movieDetails.belongs_to_collection.name}
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </aside>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
