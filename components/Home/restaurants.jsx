"use client";
import Image from "next/image";

import React, { useState, useEffect } from "react";
// import Curved_lines from "./curved_lines";
import { Link } from "nextjs13-progress";
import { useSession } from "next-auth/react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const btnClass =
  " bg-white px-2 py-2  rounded-full     lg:text-4xl text-2xl  hover:bg-black hover:text-white mx-1  ";

function Restaurants({ shops }) {
  const { data: session } = useSession();
  const role = session?.user?.role?.enum[0];
 const parsedItem = JSON.parse(shops);
  const [sliceValue, setSliceValue] = useState(3);
  const [slideIndex, setSlideIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // console.log(windowWidth);
    if (windowWidth > 1530) setSliceValue(3);
    else if (windowWidth > 900 && windowWidth < 1530) setSliceValue(2);
    else setSliceValue(1);
  }, [windowWidth]);

  
  const slide = (n) => {
    const newIndex = slideIndex + n;
    if (newIndex >= 0 && newIndex <= parsedItem.length - 3) {
      // console.log(newIndex, parsedItem.length);
      setSlideIndex(newIndex);
    } else if (
      newIndex >= 0 &&
      newIndex <= parsedItem.length - 1 &&
      sliceValue === 1
    ) {
      setSlideIndex(newIndex);
    } else {
      setSlideIndex(0);
    }
  };

  return (
    <div className="my-14 lg:my-36 flex flex-col justify-center z0">
      {/* <Curved_lines /> */}
      <h1 className="text-center font-extrabold md:text-5xl text-3xl text-[#5D5D5D] ">
        Meet the Restaurants
      </h1>
      <div className=" flex justify-center items-center  my-14 ">
        {" "}
        <div>
          <button
            onClick={() => slide(-1)}
            className="  bg-white px-2 py-2  rounded-full     lg:text-4xl text-2xl  hover:bg-black hover:text-white mx-1 "
          >
            <IoIosArrowBack />
          </button>
        </div>
        <div className=" flex ">
          <div className=" flex transition-transform duration-300 ease-in-out">
            {parsedItem
              ?.slice(slideIndex, slideIndex + sliceValue)
              .map((shop, index) => (
                <div
                  key={shop._id}
                  className="lg:w-96 sm:w-80 md:w-72 lg:mx-5 mx-3  shadow-2xl rounded-xl "
                >
                  <div className="">
                    <div className=" group h-56 lg:h-64">
                      <Image
                        src={shop.image_url}
                        height={720}
                        width={1080}
                        alt={shop.name}
                        className="  h-full   rounded-t-2xl"
                      />
                    </div>
                    <div className="pl-5 my-5">
                      <div className="text-xl font-semibold  ">{shop.name}</div>
                      <div className=" flex justify-between items-center pr-5 pt-2">
                        <div className="text-sm text-[#717171]">
                          ldlds lfjs lkdfklj kldlk
                        </div>
                        <Link
                          href={
                            role
                              ? `/display/${shop._id}/${role}`
                              : `/display/${shop._id}/user`
                          }
                          className="text-red-600 underline text-sm"
                        >
                          {" "}
                          VIEW MORE
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div>
          <button onClick={() => slide(1)} className={btnClass}>
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Restaurants;
