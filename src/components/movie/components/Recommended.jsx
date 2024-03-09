import React from "react";
import { Card } from "../../Card";
import { useParams } from "react-router-dom";

const Recommended = ({ movieDetails }) => {
  const { mediaType } = useParams();
  return (
    <div className="recommendedWrapper">
      <span className="sectionName">Recommendations</span>
      <div className="cardContainer">
        {movieDetails.recommendations.results.map((rec) => {
          const item = { ...rec, mediaType: mediaType };
          return <Card item={item} />;
        })}
      </div>
    </div>
  );
};

export default Recommended;
