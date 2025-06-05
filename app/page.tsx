import dynamic from "next/dynamic";
import Hero from "@/components/Home/hero";
import Recom from "@/components/Home/recom";
import { connect } from "@/dbConfig/dbConfig";
import Shop from "@/models/shopModel";
import Recommended from "@/models/recommendedModel";
import Review from "@/models/reviewModel";
import ReviewList from "@/components/Home/ReviewList";

// Dynamically import client-only components
const DynamicRestaurantsComponent = dynamic(
  () => import("@/components/Home/restaurants"),
  { ssr: false }
);
const DynamicNavbarComponent = dynamic(
  () => import("@/components/Navbar/navbar"),
  { ssr: false }
);

const DynamicHeroComponent = dynamic(
  () => import("@/components/Home/hero"),
  { ssr: false }
);

export default async function Home() {
  await connect();

  let shops = [];
  let recommendedItems = [];
  let reviews = [];

  try {
    shops = await Shop.find().lean();
    recommendedItems = await Recommended.find().lean();
    reviews = await Review.find().populate("user", "name email role").lean();
    console.log("Reviews fetched:", reviews);
  } catch (error) {
    console.error("Database query error:", error);
  }

  return (
    <div>
      <DynamicNavbarComponent isHomePage={true} />
      <DynamicHeroComponent />
      <Recom
        items={recommendedItems.map((item) => ({
          ...item,
          _id: item._id.toString(), // convert ObjectId to string
        }))}
      />
      <DynamicRestaurantsComponent shops={JSON.stringify(shops)} />

      <ReviewList reviews={reviews} />
    </div>
  );
}
