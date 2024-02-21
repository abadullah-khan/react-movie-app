import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMovieApi } from "../../Slices/MovieSlice";
import { Card } from "../Card";
import { VideoCard } from "../VideoCard";
import { CiPlay1 } from "react-icons/ci";
import { RxOpenInNewWindow } from "react-icons/rx";

export const Movie = () => {
  const [popularVideos, setPopularVideos] = useState(true);
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
                    {movieDetails.release_date
                      ? movieDetails.release_date
                      : movieDetails.first_air_date}
                    ({movieDetails.production_countries[0].iso_3166_1})
                  </p>
                  |
                  <p>
                    {movieDetails.runtime
                      ? movieDetails.runtime
                      : movieDetails.episode_run_time.map((time) => time)}
                    mins
                  </p>
                </div>
              </div>
              <div className="tagline">{movieDetails.tagline}</div>
              <div className="overview">
                Overview
                <p>{movieDetails.overview}</p>
              </div>
              <div className="btnContainer">
                <span onClick={() => handleWatchTrailer()}>
                  <span>
                    <CiPlay1 />
                  </span>
                  Play Trailer
                </span>
                <span onClick={() => handleIMDBApp()}>
                  <span>
                    <RxOpenInNewWindow />
                  </span>
                  IMDB Link
                </span>
              </div>
            </div>
          </div>
          <div className="extraDetailsContainer">
            <div className="scrolls">
              <div className="castContainer">
                <div className="sectionName">Top Billed Cast</div>
                <div className="cardWrapper">
                  {movieDetails.credits.cast.slice(0, 10).map((item) => {
                    return (
                      <div className="castCard" key={item.id}>
                        <div className="imgContainer">
                          <img
                            src={`https://image.tmdb.org/t/p/original${item.profile_path}`}
                            alt=""
                          />
                        </div>
                        <div className="about">
                          <div className="name">{item.name}</div>
                          <div className="character">{item.character}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <hr />
              <div className="mediaWrapper">
                <div className="header">
                  <div className="sectionName">Media</div>
                  <span
                    className={popularVideos ? "active" : ""}
                    onClick={() => setPopularVideos(true)}
                  >
                    Most Popular
                  </span>
                  <span
                    className={popularVideos ? "" : "active"}
                    onClick={() => setPopularVideos(false)}
                  >
                    Videos
                  </span>
                </div>
                {popularVideos ? (
                  <div className="videoCardWrapper">
                    {movieDetails.videos.results.map((video) =>
                      video.official === true ||
                      video.type === "Teaser" ||
                      video.type === "Trailer" ? (
                        <VideoCard item={video} />
                      ) : (
                        ""
                      )
                    )}
                  </div>
                ) : (
                  <div className="videoCardWrapper">
                    {movieDetails.videos.results.map((video) => {
                      return <VideoCard item={video} />;
                    })}
                  </div>
                )}
              </div>
              <hr />
              {movieDetails.recommendations.results.length !== 0 ? (
                <div className="recommendedMoviesWrapper">
                  <div className="header">Recommendations</div>
                  <div className="movieCardContainer">
                    {movieDetails.recommendations.results.map((item) => (
                      <Card item={item} />
                    ))}
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
            <aside>
              <p>
                <div>
                  <span>Status</span>
                  <span>{movieDetails.status}</span>
                </div>
                {movieDetails.networks ? (
                  <div>
                    <span>Network</span>
                    {movieDetails.networks.map((network) => (
                      <span> {network.name}</span>
                    ))}
                  </div>
                ) : (
                  ""
                )}
                {movieDetails.type ? (
                  <div>
                    <span>Type</span>
                    <span>{movieDetails.type}</span>
                  </div>
                ) : (
                  ""
                )}
                <div>
                  <span>Original Language</span>
                  <span>{movieDetails.original_language}</span>
                </div>
                {movieDetails.budget ? (
                  <div>
                    <span>Budget</span>
                    <span>{movieDetails.budget}</span>
                  </div>
                ) : (
                  ""
                )}
                {movieDetails.revenue ? (
                  <div>
                    <span>Revenue</span>
                    <span>{movieDetails.revenue}</span>
                  </div>
                ) : (
                  ""
                )}
                <div>
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
              </p>
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
