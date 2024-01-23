import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getMediaData } from "../../Slices/MediaSlice";
import { Card } from "../Card";

export const Media = () => {
  const dispatch = useDispatch();
  const { data, currentPage } = useSelector((state) => state.media);
  const { mediaType, contentType } = useParams();

  useEffect(() => {
    dispatch(getMediaData({ mediaType, contentType, currentPage }));
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
