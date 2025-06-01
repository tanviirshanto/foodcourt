import type { Recommended } from "@/types/recommended";
import ShopItemCard from "../shop/ShopItemCard";

interface RecomProps {
  items: Recommended[];
}

const Recom: React.FC<RecomProps> = ({ items }) => {
  return (
    <div className="mt-10 max-w-screen overflow-hidden">
      <div className="text-center font-extrabold md:text-5xl text-3xl text-black">
        Top Picks
      </div>
      <div className="flex justify-center items-center my-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mx-2">

          {items.map((item) => (
            <ShopItemCard key={item._id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recom;
