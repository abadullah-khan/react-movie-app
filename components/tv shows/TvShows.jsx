import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTvShowsApi } from "../../Slices/TvShowsSlice";
import { Card } from "../Card";

const TvShows = () => {
  const dispatch = useDispatch();
  const { tvShows_Type } = useParams();
  const { TvShowsList } = useSelector((state) => state.tvShows);
  useEffect(() => {
    dispatch(getTvShowsApi(tvShows_Type));
  });
  return (
    <>
      <div className="tvShowsContainer">
        <div className="tvShowsWrapper">
          {TvShowsList.map((tvShow) => (
            <Card item={tvShow} />
          ))}
        </div>
      </div>
    </>
  );
};
export default TvShows;
