// components/CardSlider.js

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const CardSlider = ({ parsedItem }) => {
  const [slideIndex, setSlideIndex] = useState(0);

  const slide = (n) => {
    const newIndex = slideIndex + n;
    setSlideIndex(Math.min(Math.max(0, newIndex), shops.length - 2));
  };

  return (
    <div className="relative flex justify-center my-10">
      <div className="slider-container flex overflow-hidden">
        <div className="slider-wrapper flex transition-transform duration-300 ease-in-out">
          {parsedItem.map((shop, index) => (

                
                  <div
                    key={index}
                    className="relative  md:h-96 h-48 mb-8 md:mr-8 w-[40%] md:w-1/4  mx-5"
                  >
                    <div className="border-4 border-slate-950 w-full h-full rounded-3xl">
                      <Image
                        src={shop.image_url}
                        layout="fill"
                        objectFit="cover"
                        alt="shop image"
                        className="brightness-50 rounded-3xl"
                      />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center flex-col text-slate-100">
                      <Link href={`/display/${shop._id}`}>
                        <h1 className="p-5 md:outline-text md:text-5xl text-3xl md:font-extrabold font-medium text-center transition-transform transform hover:scale-110 font-sans">
                          {shop.name}
                        </h1>
                      </Link>
                      <Link href={`/additem/${shop._id}`}>
                        <h1 className="p-5 underline ">Add Item</h1>
                      </Link>
                    </div>
                  </div>
                
            
          ))}
        </div>
      </div>
      <button
        onClick={() => slide(-1)}
        className="slider-arrow prev absolute top-1/2 left-0 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
      >
        &lt;
      </button>
      <button
        onClick={() => slide(1)}
        className="slider-arrow next absolute top-1/2 right-0 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10"
      >
        &gt;
      </button>
    </div>
  );
};

export default CardSlider;
