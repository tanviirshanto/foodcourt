"use client";

import { TypeAnimation } from "react-type-animation";

const words = [
  "Meals",
  1200,
  "Snacks",
  1200,
  "Drinks",
  1200,
  "Groceries",
  1200,
];

export default function HeroTitle() {
  return (
    <h1 className="font-NoirProBold text-4xl md:text-6xl leading-tight text-gray-900">
      <span className="block mb-1">Your Favourite</span>

      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff7b5c] to-[#ff3d7b]">
        <TypeAnimation
          sequence={words}
          wrapper="span"
          speed={50}
          repeat={Infinity}
        />
      </span>
    </h1>
  );
}
