import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getMediaData } from "../../Slices/MediaSlice";
import { Card } from "../Card";
import Pagination from "./Pagination";

export const Media = () => {
  const dispatch = useDispatch();
  const { data, currentPage, totalPages } = useSelector((state) => state.media);
  const { mediaType, contentType } = useParams();

  useEffect(() => {
    dispatch(getMediaData({ mediaType, contentType, currentPage }));
  }, [mediaType, contentType, currentPage]);

  return (
    <>
      <div className="mediaContainer">
        <div className="mediaWrapper">
          {data.map((item) => (
            <Card item={item} key={item.id} />
          ))}
        </div>
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </>
  );
};
