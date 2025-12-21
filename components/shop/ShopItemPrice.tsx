export default function ShopItemPrice({ price }: { price: number }) {
  return (
    <div className="absolute top-4 left-[-10px] rotate-45 bg-gradient-to-r from-[#ff7b5c] to-[#ff3f72] px-5 py-1 shadow-lg text-white font-bold text-sm md:text-base">
      BDT {price}
    </div>
  );
}
