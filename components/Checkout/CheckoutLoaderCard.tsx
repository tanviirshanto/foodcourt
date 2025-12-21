// components/Checkout/CheckoutLoaderCard.tsx
"use client";

export default function CheckoutLoaderCard({
  fetchError,
}: {
  fetchError: string;
}) {
  return (
    <div className="relative w-full max-w-md rounded-3xl bg-white/80 backdrop-blur border border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-8 text-center">
      <div className="mx-auto mb-4 h-12 w-12 rounded-2xl bg-gradient-to-r from-[#ff7b5c] to-[#ff3f72] flex items-center justify-center shadow-md">
        <svg
          className="h-6 w-6 animate-spin text-white"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            className="opacity-30"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-90"
            d="M22 12a10 10 0 0 1-10 10"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
        Preparing checkout…
      </h2>
      <p className="mt-2 text-gray-500">Loading order & customer details.</p>

      {!!fetchError && (
        <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
          {fetchError}
        </div>
      )}
    </div>
  );
}
