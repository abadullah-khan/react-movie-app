import React, { useEffect, useState } from "react";

import { useInView } from "react-intersection-observer";

export const VideoCard = ({ item }) => {
  const { ref, inView } = useInView();
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  return (
    <>
      <div className="videoCard" ref={ref}>
        {isVisible && (
          <iframe
            src={`https://www.youtube.com/embed/${item.key}`}
            frameBorder="0"
          ></iframe>
        )}
      </div>
    </>
  );
};
