import React, { useEffect, useState, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getTrendingApi } from "../../../Slices/HomeSlice";
import { Card } from "../../Card";
// const Card = lazy(() =>
//   import("../../Card").then((module) => ({ default: module.Card }))
// );
export const Trending = () => {
  const { trendingList } = useSelector((state) => state.home);
  const dispatch = useDispatch();

  const [time_window, setTime_window] = useState("day");
  const [media_type, setMedia_type] = useState("all");

  const [activeTimeLink, setActiveTimeLink] = useState(0);
  const [activeMediaLink, setActiveMediaLink] = useState(0);

  useEffect(() => {
    dispatch(getTrendingApi({ time_window, media_type }));
  }, [time_window, media_type]);
  const timeHandler = (time, index) => {
    setTime_window(time);
    setActiveTimeLink(index);
  };
  const mediaHandler = (media, index) => {
    setMedia_type(media);
    setActiveMediaLink(index);
  };
  return (
    <>
      <div className="trendingContainer">
        <div className="trendingStatusContainer">
          <span>Trending</span>
          <div className="time_window">
            <span
              onClick={() => timeHandler("day", 0)}
              className={activeTimeLink === 0 ? "activeTime" : ""}
            >
              Today
            </span>
            <span
              onClick={() => timeHandler("week", 1)}
              className={activeTimeLink === 1 ? "activeTime" : ""}
            >
              This Week
            </span>
          </div>
          <div className="media_type">
            <span
              onClick={() => mediaHandler("all", 0)}
              className={activeMediaLink === 0 ? "activeMedia" : "deActiveLink"}
            >
              All
            </span>
            <span
              onClick={() => mediaHandler("movie", 1)}
              className={activeMediaLink === 1 ? "activeMedia" : "deActiveLink"}
            >
              Movie
            </span>
            <span
              onClick={() => mediaHandler("tv", 2)}
              className={activeMediaLink === 2 ? "activeMedia" : "deActiveLink"}
            >
              Tv
            </span>
          </div>
        </div>
        <div className="cardWrapper">
          {/* <Suspense fallback={<h2>Wait...</h2>}> */}
          {trendingList.map((item) => (
            <Card item={item} key={item.id} />
          ))}
          {/* </Suspense> */}
        </div>
      </div>
    </>
  );
};
