import React, { useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { NavLink } from "react-router-dom";

import { getTrendPosterApi } from "../../Slices/HomeSlice";
import { Search } from "../Search";
import { Trending } from "./components/Trending";
import { FaRegStar } from "react-icons/fa";

const TrendPoster = lazy(() => import("./components/TrendPoster"));

// const Trending = lazy(() =>
//   import("./components/Trending").then((module) => ({
//     default: module.Trending,
//   }))
// );

export const Home = () => {
  const dispatch = useDispatch();
  const { trendPosterList, isLoading } = useSelector((state) => state.home);
  const { searchedList } = useSelector((state) => state.search);
  useEffect(() => {
    dispatch(getTrendPosterApi());
  }, []);

  return (
    <>
      <div className="posterContainer">
        {!isLoading && (
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
            {trendPosterList.map((item) => (
              <TrendPoster item={item} key={item.id} />
            ))}
          </Carousel>
        )}
      </div>
      {/* <Suspense fallback={<h2>Loading...</h2>}> */}
      <Trending />
      {/* </Suspense> */}
    </>
  );
};
