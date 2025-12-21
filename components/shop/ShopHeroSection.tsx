import Image from "next/image";
import { ShopType } from "@/types/shop";

interface ShopHeroSectionProps {
  shop: ShopType;
}

export default function ShopHeroSection({ shop }: ShopHeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-red-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-[120px] pb-28 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Text */}
        <div className="space-y-6">
          <span className="inline-block px-4 py-1 rounded-full bg-red-100 text-red-600 text-sm font-semibold tracking-wide">
            Featured Restaurant
          </span>
          <h1 className="text-5xl md:text-6xl xl:text-7xl font-NoirProBold leading-tight text-gray-900">
            {shop.name}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-lg leading-relaxed">
            Discover handcrafted dishes, bold flavors, and unforgettable taste —
            freshly prepared just for you.
          </p>
        </div>

        {/* Image */}
        <div className="relative">
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-red-200 to-orange-100 blur-2xl opacity-70" />
          <Image
            src={shop.image_url}
            height={720}
            width={1200}
            alt={`${shop.name} storefront`}
            priority
            className="relative rounded-3xl shadow-2xl object-cover w-full h-[420px] lg:h-[520px]"
          />
        </div>
      </div>
    </section>
  );
}
