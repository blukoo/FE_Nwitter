import React from "react";
import { isTablet } from "react-device-detect";
import { useMediaQuery } from "react-responsive";

const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({
    query: "(max-width: 767px)"
  });
  return <>{isMobile && children}</>;
};

const Tablet = ({ children }) => {
  const isTabletMin = useMediaQuery({
    query: "(min-width: 768px)"
  });

  const isTabletMax = useMediaQuery({
    query: "(max-width: 1023px)"
  });

  const real1 = isTabletMin && isTabletMax;

  return <>{real1 && children}</>;
};

const PC = ({ children }) => {
  const isPc = useMediaQuery({ query: "(min-width: 1024px)" });
  return <>{isPc && children}</>;
};

export { Mobile, Tablet, PC };
