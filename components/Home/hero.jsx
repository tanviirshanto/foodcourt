"use client";

import Image from "next/image";
import React from "react";
import { TypeAnimation } from "react-type-animation";

const Hero = () => {
  return (
    <div className="lg:h-screen h-full pt-[110px] md:pt-[100px] lg:pt-0 px-5 lg:px-20 flex flex-col lg:flex-row justify-center md:items-center text-4xl  lg:text-7xl font-NoirProBold bg-gradient-to-r from-[#7bcfee] to-[#f6747d] text-white">
      <div className="flex flex-col lg:w-1/2 text-center">
        <div className="bg-gradient-to-r from-[#eb4651] to-[#38bbea] bg-clip-text text-transparent font-bold">
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
        <div className="text-xl md:text-2xl font-NoirProRegular md:mt-10 mt-5">
          Delicious meals and drinks delivered to your doorstep!
        </div>
      </div>
      <div className="lg:w-1/3 w-[70%]  flex justify-center md:justify-start mx-auto my-7 md:my-auto " >
        <Image src="/hero.png" height={720} width={500} alt="hero" className="lg:w-full  w-auto sm:h-[60%] md:h-[100%] "    />
</div>
    </div>
  );
};

export default Hero;
