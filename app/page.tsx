import HomePage from "@/components/Home/HomePage";
import { getHomeData } from "@/lib/home/getHomeData";

export default async function Home() {
  const { shops, recommendedItems, reviews } = await getHomeData();

  return (
    <HomePage
      shops={shops}
      recommendedItems={recommendedItems}
      reviews={reviews}
    />
  );
}
