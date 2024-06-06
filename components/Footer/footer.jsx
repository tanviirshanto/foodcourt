import React from 'react'
import { Company, Location, Restaurant } from "@/lib/constants/constants";
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaTwitch, FaTwitter } from "react-icons/fa";
import Link from 'next/link';
const Footer = () => {
    return (
      <div className="h-full  bg-black text-[#a6aab6] ">
        <div className="flex lg:pt-24 pt-10 w-[95%]  lg:pl-20 px-5  items-start lg:flex-row flex-row flex-wrap lg:flex-nowrap  gap-5  ">
          <div className="lg:w-[20%]">
            <div className="text-xl font-extrabold px-4 py-2 text-white">
              FOOD CLUB
            </div>
            <div className="lg:text-lg text-md font-bold px-4 py-2  text-white    ">
              Contact
            </div>
            <div className="lg:text-md text-sm font-semibold px-4 py-2">
            
                tanviir.hossen@gmail.com
            
              <br />
              +880 1832 8923 09
            </div>
          </div>
          <div className="lg:w-[10%]">
            <div className="lg:text-xl text-md font-bold px-4 py-2 text-white">
              Company
            </div>
            <div className="flex flex-col">
              {Company.map((c) => (
                <Link
                  href=""
                  key={c.name}
                  className="text-sm lg:text-lg font-semibold px-4 py-2"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:w-[20%] ">
            <div className="lg:text-xl text-md font-bold px-4 py-2 text-white">
              Locations
            </div>
            <div className="flex flex-col">
              {Location.map((c) => (
                <Link
                  href=""
                  key={c.name}
                  className="text-sm font-semibold px-4 py-2"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
          {/* <div className="w-[30%] bg-slate-400">
            <div>Restaurants</div>
            <div className="flex flex-col">
              {Restaurant.map((c) => (
                <Link href={`c.url`} key={c.name}>
                  {c.name}
                </Link>
              ))}
            </div>
          </div> */}
          <div className="lg:w-[30%] ">
            <div className="lg:text-xl text-md font-bold py-2 text-white lg:pl-4 pl-5">
              Restaurants
            </div>
            <div className="flex flex-wrap">
              {Restaurant.map((restaurant, index) => (
                <div key={index} className="w-1/2 px-4 py-2">
                  <h2 className="text-sm font-semibold">{restaurant.name}</h2>
                  {/* <p className="text-gray-600">{restaurant.link}</p> */}
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-[20%] text-white">
            <div className="lg:text-xl text-md font-bold px-4 py-2 text-white">
              Socials
            </div>

            <div className="flex flex-row text-3xl px-4 py-2 gap-3">
              <FaInstagram />
              <FaFacebook />
              <FaTwitter />
              <FaLinkedin />
              <FaTiktok />
            </div>
          </div>
        </div>
        <div className="text-sm text-[#a6aab6] pl-8 lg:pl-24 py-5 ">
          © 2024 All - rights reserved.
        </div>
      </div>
    );
}

export default Footer