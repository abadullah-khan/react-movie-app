import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "./Card";
import { useInView } from "react-intersection-observer";
import { getSearchedMovieApi } from "../Slices/SearchSlice";

export const Search = () => {
  const dispatch = useDispatch();
  const { searchedList, query, page } = useSelector((state) => state.search);
  const { ref, inView } = useInView({ rootMargin: "50px" });
  useEffect(() => {
    dispatch(getSearchedMovieApi({ query, page }));
  }, [inView]);
  return (
    <>
      <div className="searchedContainer">
        <div className="searchedCardsWrapper">
          {searchedList.map((item) => (
            <Card item={item} />
          ))}
        </div>
      </div>
      <div ref={ref}></div>
    </>
  );
};
