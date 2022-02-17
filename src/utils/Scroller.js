import { React, useEffect } from "react";

const Scroller = ({ isLoading, ref }) => {
  useEffect(() => {
    if (ref.current) {
      window.scrollTo({
        behavior: "smooth",
        top: ref.current.offsetTop,
      });
    }
  }, [isLoading]);
  return <></>;
};

export default Scroller;
