import React from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import "react-indiana-drag-scroll/dist/style.css";

const IndianaDragScroller = ({ children }) => {
  return (
    <>
      <ScrollContainer
        ignoreElements="*[prevent-drag-scroll]"
        className="drag-scroll-container"
      >
        {children}
      </ScrollContainer>
    </>
  );
};

export default IndianaDragScroller;
