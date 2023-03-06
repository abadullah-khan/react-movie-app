import React from "react";
import { useSelector } from "react-redux";
import { Card } from "./Card";

export const Search = () => {
  const { searchedList } = useSelector((state) => state.search);
  return (
    <>
      <div className="searchedContainer">
        <div className="searchedCardsWrapper">
          {searchedList.map((item) => (
            <Card item={item} />
          ))}
        </div>
      </div>
    </>
  );
};
