import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import VideoPlayer from "../../VideoPlayer";
import { FaPlay } from "react-icons/fa";

const Videos = ({ movieDetails }) => {
  const [popularVideos, setPopularVideos] = useState(true);

  return (
    <div className="videosContainer">
      <div className="videosHeader">
        <span className="sectionName">Media</span>
        <div className="buttonContainer">
          <button
            className={popularVideos ? "active" : ""}
            onClick={() => setPopularVideos(true)}
          >
            Most Popular
          </button>
          <button
            className={popularVideos ? "" : "active"}
            onClick={() => setPopularVideos(false)}
          >
            Videos
          </button>
        </div>
      </div>
      {popularVideos ? (
        <div className="videoCardWrapper">
          {movieDetails.videos.results.map((video) =>
            video.official === true ||
            video.type === "Teaser" ||
            video.type === "Trailer" ? (
              <VideoCard video={video} key={video.id} />
            ) : (
              ""
            )
          )}
        </div>
      ) : (
        <div className="videoCardWrapper">
          {movieDetails.videos.results.map((result) => {
            return <VideoCard video={result} key={result.id} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Videos;

const VideoCard = ({ video }) => {
  const { ref, inView } = useInView();
  const [isVisible, setIsVisible] = useState(false);
  const [currentTrailerDetails, setCurrentTrailerDetails] = useState(null);

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  return (
    <>
      <div className="videoCard" ref={ref}>
        {isVisible && (
          <div
            className="imageContainer"
            onClick={() => setCurrentTrailerDetails(video)}
          >
            <img
              src={`https://i3.ytimg.com/vi/${video.key}/maxresdefault.jpg`}
              alt={video.title}
            />
            <div className="iconContainer">
              <FaPlay className="icon" />
            </div>
          </div>
        )}
      </div>
      <VideoPlayer
        currentTrailerDetails={currentTrailerDetails}
        setCurrentTrailerDetails={setCurrentTrailerDetails}
      />
    </>
  );
};
export { VideoCard };
