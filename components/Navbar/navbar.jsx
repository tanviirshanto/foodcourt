"use client"
import React, { useEffect, useState } from "react";
import Logged_name from "@/components/logged_name/logged_name";
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
      : "gradient text-white ";
  
  const secondClass = scrollY > 0 && !isHomePage ? "top-0":"";
  
  const newClass = "bg-slate-100 text-[#e60a2b] shadow-xl";
  
  const mainClass = isHomePage?navbarClasses :`${newClass} ${secondClass}`
    
  return (
    <div>
      <div
        className={`flex justify-end ${
          isHomePage ? "gradient text-white" : "text-black"
        } `}
      >
        <Logged_name scrollY={scrollY} isHomePage={isHomePage} />
      </div>
     
      <div
        className={`transition-all duration-500 items-center     ${mainClass}  lg:px-14 flex justify-between md:py-6 py-4   px-8 fixed w-screen  z-40  `}
      >
        <h1 className=" font-extrabold font-NoirProBold   ">
          <Link href={"/"} className="text-nowrap text-2xl md:text-3xl">
            FOOD CLUB
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