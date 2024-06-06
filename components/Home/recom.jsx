import Image from 'next/image';
import { Link } from 'nextjs13-progress';
import React from 'react'
import Order_now from '../order/order_now';

const Recom = ({ items }) => {
  const parsedItems = JSON.parse(items);
  return (
    <div className=" max-w-screen overflow-hidden">
      <div className="text-3xl font-NoirProBold flex justify-center items-center ">
        Top Picks
      </div>{" "}
      <div className=" flex justify-center items-center  my-14 ">
        <div className=" flex ">
          <div className=" grid grid-cols-2 gap-4 md:gap-6 mx-2 justify-center transition-transform duration-300 ease-in-out">
            {parsedItems?.map((item) => (
              <div
                key={item._id}
                className="lg:w-96 sm:w-80 md:w-72 md:mx-5 sm:mx-1   shadow-2xl rounded-xl "
              >
                <div className="h-88 md:h-full">
                  <div className=" group h-40  lg:h-64">
                    <Image
                      src={item.images[0]}
                      height={720}
                      width={1080}
                      alt={item.name}
                      className="  h-full  group-hover:brightness-75  rounded-t-2xl"
                    />
                  </div>
                  <div className="md:pl-5 pl-2 h-36 md:h-full md:my-5 my-2">
                    <div className="md:text-xl text-lg  font-semibold h-14   ">{item.name}</div>
                    <div className=" flex justify-between flex-col md:flex-row md:items-center md:pr-5 ">
                      <div className="text-xl text-[#717171] pb-1">
                        {item.price} Taka
                      </div>
                      <div className='' >
                        <Order_now item={JSON.stringify(item)} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recom;