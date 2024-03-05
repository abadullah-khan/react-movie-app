import React from "react";
import { Card } from "../../Card";

const Recommended = ({ movieDetails }) => {
  return (
    <div className="recommendedWrapper">
      <div className="sectionName">Recommendations</div>
      <div className="movieCardContainer">
        {movieDetails.recommendations.results.map((item) => (
          <Card item={item} />
        ))}
      </div>
    </div>
  );
};

export default Recommended;
