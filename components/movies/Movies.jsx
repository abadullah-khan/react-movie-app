import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import { getMoviesApi, resetState } from "../../Slices/MoviesSlice";
import { Card } from "../Card";

const Movies = () => {
  const dispatch = useDispatch();
  const { MoviesList } = useSelector((state) => state.movies);
  const { movies_type } = useParams();
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(resetState());
    dispatch(getMoviesApi({ movies_type, page }));
    setPage(1);
    console.log(page);
  }, [movies_type]);
  const loadMore = () => {
    setPage((pre) => pre + 1);
    dispatch(getMoviesApi({ movies_type, page }));
    console.log(page);
  };

  return (
    <>
      <InfiniteScroll
        dataLength={MoviesList.length}
        next={loadMore}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={<h2>You have finished it</h2>}
      >
        <div className="moviesContainer">
          <div className="moviesWrapper">
            {MoviesList.map((item) => (
              <Card item={item} />
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
