import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import { getMoviesApi, resetState } from "../../Slices/MoviesSlice";
import { Card } from "../Card";

const Movies = () => {
  const dispatch = useDispatch();
  const { MoviesList, page } = useSelector((state) => state.movies);
  const { movies_type } = useParams();

  useEffect(() => {
    dispatch(resetState());
    dispatch(getMoviesApi({ movies_type, page }));
    console.log(page);
  }, [movies_type]);
  const loadMore = () => {
    dispatch(getMoviesApi({ movies_type, page }));
  };
  return (
    <>
      <InfiniteScroll
        dataLength={MoviesList.length}
        next={loadMore}
        hasMore={true}
        endMessage={<h2>You have finished it</h2>}
      >
        <div className="moviesContainer">
          <div className="moviesWrapper">
            {MoviesList.map((item) => (
              <Card item={item} key={item.id} />
            ))}
            {/* <div className="btnContainer">
              <button onClick={() => setPage(page - 1)}>pre</button>
              <button onClick={() => setPage(page + 1)}>next</button>
            </div> */}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};
export default Movies;
