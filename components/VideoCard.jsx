import React from "react";

export const VideoCard = ({ item }) => {
  return (
    <>
      <div className="videoCard">
        <iframe
          src={`https://www.youtube.com/embed/${item.key}`}
          frameBorder="0"
        ></iframe>
      </div>
    </>
  );
};
