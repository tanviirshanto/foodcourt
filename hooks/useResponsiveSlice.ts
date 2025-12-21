"use client";

import { useEffect, useState } from "react";

export function useResponsiveSlice() {
  const [sliceValue, setSliceValue] = useState(3);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => setWindowWidth(window.innerWidth);
    updateWidth();

    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    if (windowWidth > 1530) setSliceValue(3);
    else if (windowWidth > 900) setSliceValue(2);
    else setSliceValue(1);
  }, [windowWidth]);

  return sliceValue;
}
