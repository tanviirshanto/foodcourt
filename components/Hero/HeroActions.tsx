import { Link } from "nextjs13-progress";

export default function HeroActions() {
  return (
    <>
      <p className="text-xl md:text-2xl text-gray-700 mt-3 font-NoirProRegular">
        Delivered fresh & fast — right when you crave it.
      </p>

      <div className="mt-8 flex justify-center lg:justify-start">
        <Link href="/items" className="px-7 py-4 rounded-3xl text-white font-semibold bg-gradient-to-r from-[#ff6a3d] to-[#ff3f72] shadow-lg hover:scale-105 transition">
          Order Now
        </Link>
      </div>

      <div className="mt-6 flex items-center gap-6 justify-center lg:justify-start text-gray-600">
        <Badge emoji="🚀" text="Fast Delivery" />
        <Badge emoji="🥗" text="Fresh Items" />
      </div>
    </>
  );
}

function Badge({ emoji, text }: { emoji: string; text: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-2xl">{emoji}</span>
      <span>{text}</span>
    </div>
  );
}
