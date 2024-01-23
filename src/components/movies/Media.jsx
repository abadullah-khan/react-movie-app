import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getData } from "../../Slices/MoviesSlice";
import { Card } from "../Card";

export const Media = () => {
  const dispatch = useDispatch();
  const { data, currentPage } = useSelector((state) => state.movies);
  const { mediaType, contentType } = useParams();

  useEffect(() => {
    dispatch(getData({ mediaType, contentType, currentPage }));
  }, [mediaType, contentType]);

  return (
    <>
      <div className="moviesContainer">
        <div className="moviesWrapper">
          {data.map((item) => (
            <Card item={item} key={item.id} />
          ))}
        </div>
      </div>
    </>
  );
};
