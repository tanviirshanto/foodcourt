import { connect } from "@/dbConfig/dbConfig";
import Shop from "@/models/shopModel";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Order_now from "@/components/order/order_now";
import { useSession } from "next-auth/react";

async function getShopItems(id) {
  connect();
  const s = await Shop.findOne({
    _id: id,
  });

  return s;
}

async function Page({ params }) {
  const shop = await getShopItems(params.id);
  const role = (params.role);

  console.log(shop);
  

  if (shop) {
    return (
      <div className="">
        <div className="lg:h-full bg-[#ebf7ff] flex flex-col  lg:flex-row  items-center lg:px-16 px-5 pt-[100px] md:pt-[150px] lg:pt-[200px] pb-[100px]">
          <div className="lg:text-6xl text-4xl  lg:w-[50%] flex flex-col justify-center lg:justify-start gap-8 font-NoirProBold  ">
            {shop.name}
            <div className="text-xl text-[#666c70] leading-8 font-NoirProRegular text-justify ">
              Join us for a journey of taste sensations that will leave you
              craving more.Fusion Cafe is the perfect choice for food lovers of
              all kinds. Discover the fusion of flavors and let your taste buds
              rejoice at Fusion Cafe.
            </div>
          </div>
          <div className="lg:w-[50%] flex lg:justify-end lg:my-auto   mt-10 ">
            <Image
              src={shop.image_url}
              height={720}
              width={1200}
              alt={shop.name}
              className=" md:w-full lg:w-[70%]  "
            />
          </div>
        </div>

        <div className="font-NoirProMedium font-bold text-2xl md:text-4xl md:my-24 my-14 text-center flex justify-center  ">
          <h1 className="lg:w-[30%]  ">
            Get mouth watering dishes from
            <span className="text-red-500 ml-2">{shop.name}</span>
          </h1>
        </div>
        <div className="flex justify-center flex-wrap gap-10 md:mx-14 mb-14 lg:mb-24">
          {shop?.items?.map((item) => (
            <div
              key={item._id}
              className="md:w-96 max-w-96   mx-5  shadow-2xl rounded-xl  "
            >
              <div className="">
                <div className=" group">
                  <Image
                    src={item.images[0]}
                    height={720}
                    width={1080}
                    alt={item.name}
                    className=" h-64  group-hover:brightness-75 
                     rounded-t-2xl"
                  />

                </div>
                <div className="md:pl-5 pl-5 md:my-5 my-3 space-y-3 ">
                  <div className="text-xl md:text-2xl font-semibold  text-wrap ">
                    {item.name}
                  </div>
                  <div className="text-xl">{item.price} Taka</div>
                  {role === "admin" && (
                    <Link href={`/edititem/${params.id}/${item._id}`}>
                      <h1 className="my-5 underline">Edit Item</h1>
                    </Link>
                  )}
                  {item ? <Order_now item={JSON.stringify(item)} /> : ""}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return <div>Loading.....</div>;
  }
}

export default Page;
