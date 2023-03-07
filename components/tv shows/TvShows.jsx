import React from "react";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTvShowsApi, resetState } from "../../Slices/TvShowsSlice";
import { Card } from "../Card";

const TvShows = () => {
  const dispatch = useDispatch();
  const { tvShows_Type } = useParams();
  const { TvShowsList, page } = useSelector((state) => state.tvShows);
  useEffect(() => {
    dispatch(resetState());
    dispatch(getTvShowsApi(tvShows_Type, page));
  }, []);
  const loadMore = () => {
    dispatch(getTvShowsApi(tvShows_Type, page));
  };
  return (
    <>
      <InfiniteScroll dataLength={TvShowsList.length} next={loadMore}>
        <div className="tvShowsContainer">
          <div className="tvShowsWrapper">
            {TvShowsList.map((tvShow) => (
              <Card item={tvShow} key={tvShow.id} />
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};
export default TvShows;
