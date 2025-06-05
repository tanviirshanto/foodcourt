import Image from "next/image";
import Link from "next/link";
import Order_now from "../order/order_now";
import type { Recommended } from "@/types/recommended";

interface ShopItemCardProps {
  item: Recommended;
  role?: string;
  shopId?: string;
}

const ShopItemCard: React.FC<ShopItemCardProps> = ({ item}) => {
  return (
    <div className="w-80 md:w-96 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition duration-300 overflow-hidden">
      <div className="relative group h-64">
        <Image
          src={item.images[0]}
          height={720}
          width={1080}
          alt={item.name}
          className="w-full h-full object-cover rounded-t-3xl transition-transform duration-300 group-hover:scale-105 group-hover:brightness-75"
        />
      </div>

      <div className="px-6 py-5 space-y-3">
        <h2 className="text-xl font-semibold text-gray-900 line-clamp-2">{item.name}</h2>

        <div className="flex items-center justify-between">
          <p className="text-lg font-medium text-gray-700">
           <span className="text-sm text-gray-500">BDT.</span> {item.price} 
          </p>

          <Order_now item={item} />
        </div>
      </div>
    </div>
  );
};

export default ShopItemCard;
