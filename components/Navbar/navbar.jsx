"use client"
import React, { useEffect, useState } from "react";
import Logged_name from "@/components/Navbar/logged_name";
import {Link} from "nextjs13-progress";
import { Next13NProgress } from "nextjs13-progress";
import Cart from "@/components/cart/cart";

function Navbar({isHomePage}) {
      const [scrollY, setScrollY] = useState(0);

      useEffect(() => {
        const handleScroll = () => {
          setScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }, []);

    const navbarClasses =
      scrollY > 0 && isHomePage
        ? "bg-slate-100 text-[#e60a2b] shadow-xl top-0"
        : "bg-gradient-to-r from-[#7bcfee] to-[#f6747d] text-white ";
  
  const secondClass = scrollY > 0 && !isHomePage ? "top-0":"";
  
  const newClass = "bg-slate-100 text-[#e60a2b] shadow";
  
  const mainClass = isHomePage?navbarClasses :`${newClass} ${secondClass}`
    
  return (
    <div className="z-50">
      <div
        className={`flex justify-end ${
          isHomePage ? "bg-gradient-to-r from-[#7bcfee] to-[#f6747d] text-white" : "text-black"
        } `}
      >
        <Logged_name scrollY={scrollY} isHomePage={isHomePage} />
      </div>

      <div
        className={`transition-all duration-500 items-center     ${mainClass}  lg:px-14 flex justify-between md:py-6 py-4   px-8 fixed w-screen  z-40  `}
      >
        <h1 className=" font-extrabold font-NoirProBold   ">
          <Link href={"/"} className="text-nowrap text-2xl md:text-3xl">
            FOOD COURT
          </Link>
        </h1>
        <div className="">
          <Cart />
        </div>
        <Next13NProgress color="red" height={5} />
      </div>
    </div>
  );
}

export default Navbar