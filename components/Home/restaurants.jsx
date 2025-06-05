"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Link } from "nextjs13-progress";
import { useSession } from "next-auth/react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

const btnClass =
  "bg-white px-2 py-2 rounded-full lg:text-4xl text-2xl hover:bg-black hover:text-white mx-1";

function Restaurants({ shops }) {
  const { data: session } = useSession();
  const role = session?.user?.role?.enum?.[0] || "user";

  const parsedItem = JSON.parse(shops);
  const [sliceValue, setSliceValue] = useState(3);
  const [slideIndex, setSlideIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (windowWidth > 1530) setSliceValue(3);
    else if (windowWidth > 900) setSliceValue(2);
    else setSliceValue(1);
  }, [windowWidth]);

  const slide = (n) => {
    const newIndex = slideIndex + n;
    if (newIndex >= 0 && newIndex + sliceValue <= parsedItem.length) {
      setDirection(n);
      setSlideIndex(newIndex);
    }
  };

  const swipeThreshold = 100;

  const handleDragEnd = (event, info) => {
    if (info.offset.x > swipeThreshold && slideIndex > 0) {
      slide(-1);
    } else if (
      info.offset.x < -swipeThreshold &&
      slideIndex + sliceValue < parsedItem.length
    ) {
      slide(1);
    }
  };

  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
    }),
  };

  return (
    <div className="mt-14 lg:my-20 flex flex-col justify-center z-0">
      <h1 className="text-center font-extrabold md:text-5xl text-3xl text-black">
        Meet Our Restaurants
      </h1>

      <div className="flex justify-center items-center my-14 overflow-hidden">
        {slideIndex > 0 && (
          <button onClick={() => slide(-1)} className={btnClass}>
            <IoIosArrowBack />
          </button>
        )}

        <div className="flex w-full justify-center max-w-screen-xl  mb-2">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={slideIndex}
              custom={direction}
              variants={variants}
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
              {parsedItem
                .slice(slideIndex, slideIndex + sliceValue)
                .map((shop) => (
                  <div
                    key={shop._id}
                    className="lg:w-96 sm:w-80 md:w-72 lg:mx-5 mx-3 shadow-xl rounded-xl"
                  >
                    <div className="group h-56 lg:h-64">
                      <Image
                        src={shop.image_url}
                        height={720}
                        width={1080}
                        alt={shop.name}
                        className="h-full rounded-t-2xl object-cover"
                      />
                    </div>
                    <div className="pl-5 my-5">
                      <div className="flex justify-between items-center pr-5 pt-2">
                        <div className="text-xl font-semibold text-black">
                          {shop.name}
                        </div>
                        <div className="text-sm text-[#717171]">
                          <Link
                            href={`/display/${shop._id}`}
                            className="text-red-600 underline text-sm"
                          >
                            VIEW ITEMS
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {slideIndex + sliceValue < parsedItem.length && (
          <button onClick={() => slide(1)} className={btnClass}>
            <IoIosArrowForward />
          </button>
        )}
      </div>
    </div>
  );
}

export default Restaurants;
