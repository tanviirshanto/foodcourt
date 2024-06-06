"use client";
import axios from "axios";

import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function Page({ params }: any) {
  const { data: session } = useSession();

  const [user_id, setUser_id] = useState(null);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // If session is available and user_id is not set
    if (session && !user_id) {
      const getUser_id = async () => {
        const id = session?.user?.id;
        // console.log("User ID:", id);
        setUser_id(id);
      };
      getUser_id();
    }
  },[session]);

  useEffect(() => {
    if (user_id) {
      console.log(user_id, params.order_id);
      axios.get(`/api/order/getorder/${user_id}/${params.order_id}`)
        .then((response) => {
          console.log(response.data);
          setOrder(response.data); // Access the data property from the response object
        })
        .catch((error) => {
          console.error("Error fetching the order:", error);
        });
    }
  }, [user_id]);

  return (
    <div className="max-w-screen min-h-screen mb-14 lg:mb-36">
      <div className="md:w-[40%] pt-24 mx-auto">
        <div className="text-2xl text-center mt-14 mb-8">Ordered Items</div>

        {order?.items?.map((item) => (
          <li
            className="flex  py-6 text-left sm:flex-row  space-y-0"
            key={item._id}
          >
            <div className="shrink-0 relative">
              <span className="absolute top-1 left-1 flex h-6 w-6 items-center justify-center rounded-full border bg-white text-sm font-medium text-gray-500 shadow  -right-2">
                {item.quantity}
              </span>
              <Image
                className="h-24 w-24 max-w-full rounded-lg object-cover mr-5  "
                src={item.image}
                alt=""
                height={300}
                width={300}
              />
            </div>

            <div className="relative flex flex-1 flex-col justify-between">
              <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                <div className="">
                  <p className="text-base font-semibold text-gray-900">
                    {item.name}
                  </p>
                  <p className="mx-0 mt-1 mb-0 text-sm text-gray-400">
                    {item.category}
                  </p>
                  <p className="mx-0 mt-1 mb-0 text-sm text-gray-400">
                    {item.estimated_time * item.quantity}
                  </p>
                </div>

                <div className=" flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                  <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">
                    {item.price * item.quantity}
                  </p>
                </div>
              </div>
            </div>
            <hr />
          </li>
        ))}
        <div className="flex flex-col gap-3 text-slate-500">
          <div className="text-lg flex justify-between">
            <span className="font-semibold">Shipping Charge</span>{" "}
            <span>{order?.shipping_charge}</span>
          </div>
          <div className="text-lg flex justify-between">
            <span className="font-semibold">Order Total:</span>{" "}
            <span>{order?.full_total}</span>
          </div>
          <hr />
          <div className="text-lg flex justify-between mt-5">
            
            <span className="font-semibold">Shipping Status:</span>{" "}
            <span>{order?.shipping}</span>
          </div>
          <div className="text-lg flex justify-between ">
            <span className="font-semibold">Payment Status:</span>{" "}
            <span>{order?.payment}</span>
          </div>
          <div className="text-lg flex justify-between">
            <span
              className="font-semibold 
            text-nowrap "
            >
              Shipping Address:
            </span>{" "}
            <span className="text-right">{order?.address}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
