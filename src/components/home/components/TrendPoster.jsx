import React from "react";
import { NavLink } from "react-router-dom";

import { FaRegStar } from "react-icons/fa";

const TrendPoster = ({ item }) => {
  return (
    <>
      <div className="wrapper" title={item.title ? item.title : item.name}>
        <div className="posterImg">
          <img
            src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
            alt=""
          />
        </div>
        <NavLink to={`/movie/${item.media_type}/${item.id}`}>
          <div className="overlay">
            <div className="container">
              <div className="itemImg">
                <img
                  src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
                  alt=""
                />
              </div>
              <div className="details">
                <h1>{item.original_title ? item.original_title : item.name}</h1>
                <div className="runTime">
                  <p>
                    Release date :{" "}
                    <span>
                      {item.release_date
                        ? item.release_date
                        : item.first_air_date}
                    </span>
                  </p>
                  <p>
                    Language : <span> {item.original_language}</span>
                  </p>
                  <p>
                    rating :{" "}
                    <span>
                      {item.vote_average}{" "}
                      <span>
                        <FaRegStar />
                      </span>
                    </span>
                  </p>
                </div>
                <hr />
                <p>
                  <span>Overview : </span> {item.overview.slice(0, 128)}
                  ...
                </p>
              </div>
            </div>
          </div>
        </NavLink>
      </div>
    </>
  );
};

export default TrendPoster;
