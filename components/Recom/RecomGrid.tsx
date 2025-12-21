import type { ShopItem } from "@/types/recommended";
import RecomItem from "./RecomItem";

export default function RecomGrid({ items }: { items: ShopItem[] }) {
  return (
    <div className="flex flex-wrap justify-center gap-8">
      {items.map((item, index) => (
        <RecomItem key={item._id} item={item} index={index} />
      ))}
    </div>
  );
}
