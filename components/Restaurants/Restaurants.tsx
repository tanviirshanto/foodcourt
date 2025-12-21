"use client";

import SectionHeader from "../Common/SectionHeader";
import RestaurantsSlider from "./RestaurantsSlider";

export default function Restaurants({ shops }: { shops: string }) {
  const parsedShops = JSON.parse(shops);

  return (
    <div className="mt-20 lg:mt-28 flex flex-col justify-center z-0">
      <SectionHeader text="Meet Our Restaurants" gradient />
      <RestaurantsSlider shops={parsedShops} />
    </div>
  );
}
