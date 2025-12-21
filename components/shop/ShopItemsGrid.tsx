import ShopItemCard from "@/components/Shop/ShopItemCard";
import type { ItemType } from "@/types/shop";

interface ShopItemsGridProps {
  items: ItemType[];
}

export default function ShopItemsGrid({ items }: ShopItemsGridProps) {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-24">
      {items.map((item) => (
        <ShopItemCard key={String(item._id)} item={item as any} />
      ))}
    </section>
  );
}
