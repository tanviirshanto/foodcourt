import dynamic from "next/dynamic";
import Recom from "@/components/Recom/Recom";
import Reviews from "@/components/Reviews/Reviews";

const Navbar = dynamic(() => import("@/components/Navbar/Navbar"), {
  ssr: false,
});
const Hero = dynamic(() => import("@/components/Hero/Hero"), {
  ssr: true,
});
const Restaurants = dynamic(
  () => import("@/components/Restaurants/Restaurants"),
  {
    ssr: true,
  }
);

type Props = {
  shops: any[];
  recommendedItems: any[];
  reviews: any[];
};

export default function HomePage({ shops, recommendedItems, reviews }: Props) {
  return (
    <>
      <Navbar/>
      <Hero />
      <Recom items={recommendedItems} />
      <Restaurants shops={JSON.stringify(shops)} />
      <Reviews reviews={reviews} />
    </>
  );
}
