
import { authOptions } from "../app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import Navbar from "@/components/Navbar/navbar"
import dynamic from "next/dynamic";
import Shop from "@/models/shopModel";
import Recommended from "@/models/recommendedModel";
import Restaurants from "@/components/Home/restaurants";
import Hero from "@/components/Home/hero";
import Reviews from "@/components/Home/reviews";
import Recom from "@/components/Home/recom";

async function GetAllShops() {
  const shops = await Shop.find();
  return shops;
}

async function GetAllRecom() {
  const items = await Recommended.find();
  return items;
}

const DynamicMapComponent = dynamic(
  () => import("@/components/Home/restaurants"),
  {
    ssr: false,
  }
);


async function Home() {

  const s=await GetAllShops()
  const i = await GetAllRecom();
  
  return (
    <div>
      <Navbar isHomePage="true" />
      <Hero />
      <DynamicMapComponent shops={JSON.stringify(s)} />
      <Recom items={JSON.stringify(i)} />
      <Reviews />
    </div>
  );
}

export default Home;