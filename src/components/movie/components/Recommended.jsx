import React from "react";
import { Card } from "../../Card";

const Recommended = ({ movieDetails }) => {
  return (
    <div className="recommendedWrapper">
      <span className="sectionName">Recommendations</span>
      <div className="cardContainer">
        {movieDetails.recommendations.results.map((item) => (
          <Card item={item} />
        ))}
      </div>
    </div>
  );
};

export default Recommended;
