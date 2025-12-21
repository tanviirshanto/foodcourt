import { ShopItem } from "@/types/recommended";
import ShopItemCard from "@/components/Shop/ShopItemCard";

interface ShopItemsGridProps {
  items: ShopItem[];
}

export default function ShopItemsGrid({ items }: ShopItemsGridProps) {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-24">
      {items?.map((item) => (
        <ShopItemCard key={item._id} item={item} />
      ))}
    </section>
  );
}
