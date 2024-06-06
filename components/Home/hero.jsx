"use client";

import Image from "next/image";
import React from "react";
import { TypeAnimation } from "react-type-animation";

const Hero = () => {
  return (
    <div className="lg:h-screen h-full pt-[100px] lg:pt-0 px-5 lg:px-20 flex flex-col lg:flex-row md:justify-center md:items-center text-5xl  lg:text-7xl font-NoirProBold gradient text-white ">
      <div className="flex flex-col lg:w-1/2">
        <div className="">
          {" "}
          <TypeAnimation
            sequence={[
              "GOOD FOODS",
              1000, // wait 1s before replacing "Mice" with "Hamsters"
              "SNACKS",
              1000,
              "LIQUOR",
              1000,
              "ESSENTIALS",
              1000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </div>
        <div className="text-nowrap  ">on-demand.</div>
        <div className="text-2xl font-NoirProRegular md:mt-10 mt-7">
          Delicious meals and drinks delivered to your doorstep!
        </div>
      </div>
      <div className="lg:w-1/3 w-[70%]  flex justify-center md:justify-start mx-auto " >
        <Image src="/hero.png" height={720} width={500} alt="hero" className="lg:w-full  w-auto sm:h-[60%] md:h-[100%] "    />
</div>
    </div>
  );
};

export default Hero;
