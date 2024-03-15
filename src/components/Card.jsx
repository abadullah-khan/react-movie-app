import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
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
      <div
        ref={ref}
        className="card"
        title={item.title ? item.title : item.name}
      >
        <NavLink to={`/movie/${item.mediaType}/${item.id}`}>
          <div className="imgContainer">
            {isVisible && (
              <img
                src={`https://image.tmdb.org/t/p/original${
                  item.backdrop_path ? item.backdrop_path : item.poster_path
                }`}
                alt={item.title ? item.title : item.name}
              />
            )}
          </div>
          <div className="detailsContainer">
            <h3>{item.title ? item.title : item.name}</h3>
            <div className="details">
              <span>
                {item.release_date ? item.release_date : item.first_air_date}
              </span>
              <p>
                {item.vote_average}
                <span>
                  <FaStar />
                </span>
              </p>
            </div>
          </div>
        </NavLink>
      </div>
    </>
  );
};
