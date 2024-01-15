import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTvShowsApi, resetState } from "../../Slices/TvShowsSlice";
import { Card } from "../Card";
import { useInView } from "react-intersection-observer";

export const TvShows = () => {
  const dispatch = useDispatch();
  const { tvShows_Type } = useParams();
  const { TvShowsList, page } = useSelector((state) => state.tvShows);
  const { ref, inView } = useInView({ rootMargin: "50px" });
  useEffect(() => {
    dispatch(resetState());
    dispatch(getTvShowsApi({ tvShows_Type, page }));
  }, [tvShows_Type]);
  useEffect(() => {
    if (inView) {
      dispatch(getTvShowsApi({ tvShows_Type, page }));
    }
  }, [inView]);
  return (
    <>
      <div className="tvShowsContainer">
        <div className="tvShowsWrapper">
          {TvShowsList.map((tvShow) => (
            <Card item={tvShow} key={tvShow.id} />
          ))}
        </div>
      </div>
      <div ref={ref}></div>
    </>
  );
};
