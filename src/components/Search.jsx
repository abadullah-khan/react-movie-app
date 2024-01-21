import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "./Card";
import { useInView } from "react-intersection-observer";
import { getSearchedMovieApi } from "../Slices/SearchSlice";
import { RingLoader } from "react-spinners";

export const Search = () => {
  const dispatch = useDispatch();
  const { searchedList, query, page, hasMore, isLoading } = useSelector(
    (state) => state.search
  );
  const { ref, inView } = useInView({ rootMargin: "50px" });

  useEffect(() => {
    inView && hasMore && dispatch(getSearchedMovieApi({ query, page }));
  }, [inView]);

  return (
    <>
      <div className="searchedContainer">
        <div className="searchedCardsWrapper">
          {searchedList.map((item) => (
            <Card item={item} key={item.id} />
          ))}
        </div>
        {hasMore ? (
          <div ref={ref} className="infinite-scroll-status">
            {isLoading && <RingLoader />}
          </div>
        ) : (
          <div className="infinite-scroll-status">All data loaded</div>
        )}
      </div>
    </>
  );
};
