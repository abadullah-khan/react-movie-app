import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLatestTrailers } from "../../../Slices/HomeSlice";
import { useInView } from "react-intersection-observer";
import { FaPlay } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import VideoPlayer from "../../VideoPlayer";

const LatestTrailers = () => {
  const { isLoading, latestTrailers } = useSelector((state) => state.home);
  const dispatch = useDispatch();

  const [contentType, setContentType] = useState({
    movie: "upcoming",
    tv: "top_rated",
  });
  const [activeContent, setActiveContent] = useState(0);

  useEffect(() => {
    dispatch(getLatestTrailers({ contentType }));
  }, [contentType]);

  const contentHandler = (flag) => {
    if (flag === 0) {
      setContentType({ movie: "upcoming", tv: "top_rated" });
      setActiveContent(flag);
    } else if (flag === 1) {
      setContentType({
        movie: "popular",
        tv: "popular",
      });
      setActiveContent(flag);
    } else if (flag === 2) {
      setContentType({ movie: "now_playing", tv: "on_the_air" });
      setActiveContent(flag);
    }
  };

  return (
    <div className="latestTrailersContainer">
      {!isLoading && latestTrailers && (
        <img
          src={`https://i3.ytimg.com/vi/${
            latestTrailers[Math.round(Math.random() * 19)]?.key
          }/maxresdefault.jpg`}
          alt={latestTrailers[Math.round(Math.random() * 19)]?.title}
        />
      )}
      <div className="contentTypeStatusContainer">
        <span>Latest trailers</span>
        <div className="contentTypeContainer">
          <span
            onClick={() => contentHandler(0)}
            className={activeContent === 0 ? "activeContent" : ""}
          >
            <span className={activeContent === 0 ? "activeInnerLayer" : ""}>
              Upcoming
            </span>
          </span>
          <span
            onClick={() => contentHandler(1)}
            className={activeContent === 1 ? "activeContent" : ""}
          >
            <span className={activeContent === 1 ? "activeInnerLayer" : ""}>
              Popular
            </span>
          </span>
          <span
            onClick={() => contentHandler(2)}
            className={activeContent === 2 ? "activeContent" : ""}
          >
            <span className={activeContent === 2 ? "activeInnerLayer" : ""}>
              Streaming
            </span>
          </span>
        </div>
      </div>
      <div className="trailerCardsWrapper">
        {!isLoading ? (
          latestTrailers.map((trailer) => (
            <TrailerCard trailer={trailer} key={trailer.key} />
          ))
        ) : (
          <div>Loading... </div>
        )}
      </div>
    </div>
  );
};
export default LatestTrailers;

const TrailerCard = ({ trailer }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { ref, inView } = useInView({ threshold: 0 });
  const [currentTrailerDetails, setCurrentTrailerDetails] = useState(null);

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  return (
    <div ref={ref} className="trailerCard">
      {isVisible && (
        <div
          className="imageContainer"
          onClick={() => setCurrentTrailerDetails(trailer)}
        >
          <img
            src={`https://i3.ytimg.com/vi/${trailer.key}/maxresdefault.jpg`}
            alt={trailer.title}
          />
          <div className="iconContainer">
            <FaPlay className="icon" />
          </div>
        </div>
      )}
      <VideoPlayer
        currentTrailerDetails={currentTrailerDetails}
        setCurrentTrailerDetails={setCurrentTrailerDetails}
      />
      <NavLink to={`/movie/${trailer.mediaType}/${trailer.movieId}`}>
        <h3 className="trailerTitle">{trailer.title}</h3>
        <div className="trailerName">{trailer.name}</div>
      </NavLink>
    </div>
  );
};
export { TrailerCard };
