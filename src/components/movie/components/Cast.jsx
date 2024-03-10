import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const Cast = ({ movieDetails }) => {
  return (
    <section className="castContainer">
      <span className="sectionName">Top Billed Cast</span>
      <div className="cardWrapper">
        {movieDetails.credits.cast.slice(0, 15).map((item) => (
          <CastCard item={item} key={item.id} />
        ))}
      </div>
    </section>
  );
};
export default Cast;

const CastCard = ({ item }) => {
  const { ref, inView } = useInView({ threshold: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);
  return (
    <div className="castCard" key={item.id} ref={ref}>
      <div className="imgContainer">
        {isVisible && (
          <img
            src={`https://image.tmdb.org/t/p/original${item.profile_path}`}
            alt=""
          />
        )}
      </div>
      <div className="about">
        <span className="name">{item.name}</span>
        <span className="character">{item.character}</span>
      </div>
    </div>
  );
};
export { CastCard };
