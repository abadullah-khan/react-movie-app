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
          <div className="linkContainer">
            <span
              onClick={() => timeHandler("day", 0)}
              className={activeTimeLink === 0 ? "activeLink" : ""}
            >
              <span className={activeTimeLink === 0 ? "activeInnerLayer" : ""}>
                Today
              </span>
            </span>
            <span
              onClick={() => timeHandler("week", 1)}
              className={activeTimeLink === 1 ? "activeLink" : ""}
            >
              <span className={activeTimeLink === 1 ? "activeInnerLayer" : ""}>
                This Week
              </span>
            </span>
          </div>
          <div className="linkContainer">
            <span
              onClick={() => mediaHandler("all", 0)}
              className={activeMediaLink === 0 ? "activeLink" : ""}
            >
              <span className={activeMediaLink === 0 ? "activeInnerLayer" : ""}>
                All
              </span>
            </span>
            <span
              onClick={() => mediaHandler("movie", 1)}
              className={activeMediaLink === 1 ? "activeLink" : ""}
            >
              <span className={activeMediaLink === 1 ? "activeInnerLayer" : ""}>
                Movie
              </span>
            </span>
            <span
              onClick={() => mediaHandler("tv", 2)}
              className={activeMediaLink === 2 ? "activeLink" : ""}
            >
              <span className={activeMediaLink === 2 ? "activeInnerLayer" : ""}>
                Tv
              </span>
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
