import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getMoviesApi, resetState } from "../../Slices/MoviesSlice";
import { Card } from "../Card";
import { useInView } from "react-intersection-observer";

export const Movies = () => {
  const dispatch = useDispatch();
  const { MoviesList, page } = useSelector((state) => state.movies);
  const { movies_type } = useParams();
  const { ref, inView } = useInView({
    rootMargin: "50px",
  });
  useEffect(() => {
    dispatch(resetState());
    dispatch(getMoviesApi({ movies_type, page }));
  }, [movies_type]);

  useEffect(() => {
    if (inView) {
      dispatch(getMoviesApi({ movies_type, page }));
    }
  }, [inView]);
  return (
    <>
      <div className="moviesContainer" ref={ref}>
        <div className="moviesWrapper">
          {MoviesList.map((item) => (
            <Card item={item} key={item.id} />
          ))}
        </div>
      </div>
      <div ref={ref}></div>
    </>
  );
};
