import { Star } from "@mui/icons-material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { NavLink } from "react-router-dom";

import { getTrendPosterApi } from "../../Slices/HomeSlice";
import { Search } from "../Search";
import { Trending } from "./components/Trending";

const Home = () => {
  const dispatch = useDispatch();
  const { trendPosterList } = useSelector((state) => state.home);
  const { searchedList } = useSelector((state) => state.search);
  useEffect(() => {
    dispatch(getTrendPosterApi());
  }, []);

  return (
    <>
      {searchedList.length > 0 ? (
        <Search />
      ) : (
        <>
          <div className="posterContainer">
            <Carousel
              width={"100%"}
              autoPlay={true}
              showThumbs={false}
              infiniteLoop
              interval={1300}
              showStatus={false}
              showArrows={false}
              className="carousel"
            >
              {trendPosterList
                .filter((item, index) => index < 5)
                .map((item) => {
                  return (
                    <div className="wrapper" key={item.id}>
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
                              <h1>
                                {item.original_title
                                  ? item.original_title
                                  : item.name}
                              </h1>
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
                                  Language :{" "}
                                  <span> {item.original_language}</span>
                                </p>
                                <p>
                                  rating :{" "}
                                  <span>
                                    {item.vote_average}{" "}
                                    <span>
                                      <Star />{" "}
                                    </span>{" "}
                                  </span>
                                </p>
                              </div>
                              <hr />
                              <p>
                                <span>Overview : </span>{" "}
                                {item.overview.slice(0, 128)}
                                ...
                              </p>
                            </div>
                          </div>
                        </div>
                      </NavLink>
                    </div>
                  );
                })}
            </Carousel>
          </div>
          <Trending />
        </>
      )}
    </>
  );
};

export default Home;
