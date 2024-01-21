import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "./Card";
import { useInView } from "react-intersection-observer";
import { getSearchedMovie } from "../Slices/SearchSlice";
import { RingLoader } from "react-spinners";

export const Search = () => {
  const dispatch = useDispatch();
  const { data, query, currentPage, hasMore, isLoading } = useSelector(
    (state) => state.search
  );
  const { ref, inView } = useInView({ rootMargin: "50px" });

  useEffect(() => {
    inView && hasMore && dispatch(getSearchedMovie({ query, currentPage }));
  }, [inView]);

  return (
    <>
      <div className="searchedContainer">
        <div className="searchedCardsWrapper">
          {data.map((item) => (
            <Card item={item} key={item.id} />
          ))}
        </div>
        {hasMore ? (
          <div ref={ref} className="infinite-scroll-status">
            {isLoading && <RingLoader color="lightBlue" />}
          </div>
        ) : (
          <div className="infinite-scroll-status">All data loaded</div>
        )}
      </div>
    </>
  );
};
