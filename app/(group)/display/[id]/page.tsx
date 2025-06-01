import { connect } from "@/dbConfig/dbConfig";
import Shop from "@/models/shopModel";
import Image from "next/image";
import React from "react";
import { ShopType } from "@/types/shop";
import ShopItemCard from "@/components/shop/ShopItemCard";

export const dynamic = "force-dynamic";

interface Params {
  params: {
    id: string;
    role: string;
  };
}

async function getShopItems(id: string): Promise<ShopType | null> {
  await connect();
  const shop = await Shop.findOne({ _id: id }).lean();
  return shop as ShopType;
}

export default async function Page({ params }: Params) {
  const shop = await getShopItems(params.id);

  if (!shop) return <div className="text-center py-20 text-gray-500">Loading...</div>;

  return (
    <main className="min-h-screen bg-[#f9fbfd] text-gray-800">
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto px-6 md:px-12 pt-[100px] md:pt-[140px] lg:pt-[180px] pb-24 gap-12">
        <div className="lg:w-1/2 flex flex-col gap-6">
          <h1 className="text-5xl lg:text-6xl font-NoirProBold leading-tight">{shop.name}</h1>
          <p className="text-lg md:text-xl text-gray-600 font-NoirProRegular max-w-md leading-relaxed">
            Join us for a journey of taste sensations that will leave you craving more.
          </p>
        </div>
        <div className="lg:w-1/2 flex justify-center lg:justify-end">
          <Image
            src={shop.image_url}
            height={720}
            width={1200}
            alt={`${shop.name} storefront`}
            className="rounded-lg shadow-lg object-cover max-w-full h-auto"
            priority
          />
        </div>
      </section>

      {/* Subtitle */}
      <section className="max-w-4xl mx-auto text-center mb-16 md:mb-24 px-4">
        <h2 className="text-3xl md:text-4xl font-NoirProMedium font-bold text-gray-900">
          Get mouth-watering dishes from{" "}
          <span className="text-red-600">{shop.name}</span>
        </h2>
      </section>

      {/* Items Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-24">
        {shop.items?.map((item: any) => (
          <ShopItemCard key={item._id} item={item} />
        ))}
      </section>
    </main>
  );
}
