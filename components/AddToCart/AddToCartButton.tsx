"use client";

type Props = {
  onClick: () => void;
};

export default function AddToCartButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="bg-green-600 md:px-5 px-3 py-2 md:mb-4 rounded-xl w-32 md:w-36 text-slate-50 text-lg font-medium cursor-pointer hover:bg-green-700 transition"
    >
      Add to cart
    </button>
  );
}
