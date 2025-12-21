import ShopItemCard from "@/components/Shop/ShopItemCard";
import type { ShopItem } from "@/types/recommended";

export default function ItemsGrid({ items }: { items: ShopItem[] }) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
      {items.map((item) => (
        <ShopItemCard key={item._id} item={item} />
      ))}
    </section>
  );
}
