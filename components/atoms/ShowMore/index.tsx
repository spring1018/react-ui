"use client";
import { useEffect, useRef, useState } from "react";

const ShowMore = ({ children, maxHeight = "100px" }) => {
  const [showMore, setShowMore] = useState(false);
  const contentRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (contentRef.current) {
        setIsOverflowing(contentRef.current.scrollHeight > parseInt(maxHeight));
      }
    });

    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }

    return () => {
      if (contentRef.current) {
        resizeObserver.unobserve(contentRef.current);
      }
    };
  }, [maxHeight, children]);

  return (
    <div>
      <div
        ref={contentRef}
        className={`overflow-hidden transition-all duration-300`}
        style={{ maxHeight: showMore ? "none" : maxHeight }}
      >
        {children}
      </div>
      {isOverflowing && (
        <button
          className="mt-2 text-blue-500 hover:underline"
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
};

export default ShowMore;
