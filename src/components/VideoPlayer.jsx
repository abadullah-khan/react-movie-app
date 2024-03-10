import React from "react";

const VideoPlayer = ({ currentTrailerDetails, setCurrentTrailerDetails }) => {
  return (
    <>
      {currentTrailerDetails && (
        <div className="videoContainer">
          <div className="videoWrapper">
            <div className="videoDetails">
              <h3>
                {currentTrailerDetails.title} | {currentTrailerDetails.name}
              </h3>
              <button onClick={() => setCurrentTrailerDetails(null)}>
                Close
              </button>
            </div>
            <iframe
              src={`https://www.youtube.com/embed/${currentTrailerDetails.key}`}
              frameBorder="0"
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoPlayer;
