
import dynamic from "next/dynamic";
import Shop from "@/models/shopModel";
import Recommended from "@/models/recommendedModel";
import Hero from "@/components/Home/hero";
import Reviews from "@/components/Home/reviews";
import Recom from "@/components/Home/recom";
import { connect } from "@/dbConfig/dbConfig";

connect();

async function GetAllShops() {
  const shops = await Shop.find();
  return shops;
}

async function GetAllRecom() {
  const items = await Recommended.find();
  return items;
}

const DynamicRestaurantsComponent = dynamic(
  () => import("@/components/Home/restaurants"),
  {
    ssr: false,
  }
);

const DynamicNavbarComponent = dynamic(
  () => import("@/components/Navbar/navbar"),
  {
    ssr: false,
  }
);


async function Home() {

  const s=await GetAllShops()
  const i = await GetAllRecom();
  
  return (
    <div>
      <DynamicNavbarComponent isHomePage="true" />
      <Hero />
      <DynamicRestaurantsComponent shops={JSON.stringify(s)} />
      <Recom items={JSON.stringify(i)} />
      <Reviews />
    </div>
  );
}

export default Home;