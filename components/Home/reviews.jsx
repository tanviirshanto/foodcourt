"use client";
import React from "react";
import { FaXTwitter, FaXFacebook, FaXInstagram } from "react-icons/fa6";

const rev = [
  {
    place: "Twitter",
    comments:
      "You can order from @foodcourt_app daily for a month and still wont repeat meal! So many delicious varieties to choose from!",
    name: "@___amah",
  },
  {
    place: "Facebook",
    comments:
      "The meals are delicious and the packaging is top notch. I love that their environmental friendly packaging aswell. Delivery is always fast. One of the best food apps I've used in Lagos.",
    name: "@finix",
  },
  {
    place: "Instagram",
    comments:
      "Seamless experience from start to finish! Makes me so excited to see",
    name: "@Mir Fontana",
  },
];

const Reviews = () => {
  return (
    <div className="relative z-0 h-[600px] max-w-screen overflow-hidden flex flex-col items-center mt-14 ">
      <div className="my-10 text-3xl">Reviews</div>
      <div
        className="h-[300px] border w-screen lg:w-[60%] lg:max-w-[60%] animate-slideLoop shadow-2xl mx-auto  "
        style={{ "z-index": 0 }}
      >
        <div className="flex justify-end w-full p-10 text-4xl  ">
          {rev.place === "Twitter" && <FaXTwitter />}
          {rev.place === "Facebook" && <FaXFacebook />}
          {rev.place === "Instagram" && <FaXInstagram />}
        </div>
        <div className="  inset-0 top-1/3 h-[200px] w-[80%] lg:w-1/2 mx-auto gap-5">
          <h1 classname="text-slate-400 ">@___amah</h1>
          <h1 className="text-xl text-justify">
            You can order from @foodcourt_app daily for a month and still won
            {"'"}t repeat meal! So many delicious varieties to choose from!
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
