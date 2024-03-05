import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

const Videos = ({ movieDetails }) => {
  const [popularVideos, setPopularVideos] = useState(true);

  return (
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
  );
};

export default Videos;

const VideoCard = ({ item }) => {
  const { ref, inView } = useInView();
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  return (
    <>
      <div className="videoCard" ref={ref}>
        {isVisible && (
          <iframe
            src={`https://www.youtube.com/embed/${item.key}`}
            frameBorder="0"
          ></iframe>
        )}
      </div>
    </>
  );
};
export { VideoCard };
