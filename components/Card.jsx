import React, { useState, useEffect } from "react";
import { Star } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { useInView } from "react-intersection-observer";

export const Card = ({ item }) => {
  const { ref, inView } = useInView({ threshold: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  return (
    <>
      <div className="home_card">
        <NavLink to={`/movie/${item.media_type}/${item.id}`}>
          <div ref={ref} className="imgContainer">
            {isVisible && (
              <img
                src={`https://image.tmdb.org/t/p/original${
                  item.backdrop_path ? item.backdrop_path : item.poster_path
                }`}
                alt={item.title ? item.title : item.name}
              />
            )}
          </div>
          <div className="details">
            <h3>{item.title ? item.title : item.name}</h3>
            <div className="runTime">
              <span>
                {item.release_date ? item.release_date : item.first_air_date}
              </span>
              <p>
                {item.vote_average}
                <span>
                  <Star />
                </span>
              </p>
            </div>
          </div>
        </NavLink>
      </div>
    </>
  );
};
