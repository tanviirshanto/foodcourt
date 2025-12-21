import Image from "next/image";
import { Link } from "nextjs13-progress";

export default function RestaurantCard({ shop }: { shop: any }) {
  return (
    <div className="w-72 sm:w-72 md:w-72 lg:w-96 flex-none group">
      <div className="rounded-3xl overflow-hidden shadow-xl backdrop-blur-xl bg-white/70 hover:shadow-2xl transition duration-300">
        <div className="relative h-64 overflow-hidden">
          <Image
            src={shop.image_url}
            height={720}
            width={1080}
            alt={shop.name}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />

          <div className="absolute bottom-0 left-0 w-full px-4 py-2 bg-gradient-to-t from-black/60 to-transparent">
            <span className="text-white font-semibold text-lg">
              {shop.name}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center px-6 py-4">
          <p className="text-gray-600 text-sm">Explore Menu</p>

          <Link
            href={`/display/${shop._id}`}
            className="text-[#ff3f72] font-semibold hover:underline text-sm"
          >
            VIEW ITEMS
          </Link>
        </div>
      </div>
    </div>
  );
}
