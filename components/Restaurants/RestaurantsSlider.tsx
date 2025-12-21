"use client";

import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import RestaurantCard from "./RestaurantCard";
import { useResponsiveSlice } from "@/hooks/useResponsiveSlice";
import { sliderVariants } from "@/hooks/sliderVariants";

const btnClass =
  "bg-white/80 backdrop-blur-xl border border-gray-200 shadow-md px-3 py-3 rounded-full text-2xl lg:text-4xl hover:bg-black hover:text-white transition duration-300 mx-2";

export default function RestaurantsSlider({ shops }: { shops: any[] }) {
  const sliceValue = useResponsiveSlice();

  const [slideIndex, setSlideIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slide = (n: number) => {
    const newIndex = slideIndex + n;
    if (newIndex >= 0 && newIndex + sliceValue <= shops.length) {
      setDirection(n);
      setSlideIndex(newIndex);
    }
  };

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x > 100 && slideIndex > 0) slide(-1);
    else if (info.offset.x < -100 && slideIndex + sliceValue < shops.length)
      slide(1);
  };

  return (
    <div className="flex justify-center items-center my-14 overflow-hidden">
      {slideIndex > 0 && (
        <button onClick={() => slide(-1)} className={btnClass}>
          <IoIosArrowBack />
        </button>
      )}

      <div className="flex w-full justify-center max-w-screen-xl">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={slideIndex}
            custom={direction}
            variants={sliderVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            className="flex"
          >
            {shops.slice(slideIndex, slideIndex + sliceValue).map((shop) => (
              <RestaurantCard key={shop._id} shop={shop} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {slideIndex + sliceValue < shops.length && (
        <button onClick={() => slide(1)} className={btnClass}>
          <IoIosArrowForward />
        </button>
      )}
    </div>
  );
}
