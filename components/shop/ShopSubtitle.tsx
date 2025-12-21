import { ShopType } from "@/types/shop";

interface ShopSubtitleProps {
  shop: ShopType;
}

export default function ShopSubtitle({ shop }: ShopSubtitleProps) {
  return (
    <section className="max-w-4xl mx-auto text-center mb-16 md:mb-24 px-4">
      <h2 className="text-3xl md:text-4xl font-NoirProMedium font-bold text-gray-900">
        Get mouth-watering dishes from <span className="text-red-600">{shop.name}</span>
      </h2>
    </section>
  );
}
