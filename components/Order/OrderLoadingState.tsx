"use client";

export default function OrderLoadingState() {
  return (
    <div className="rounded-3xl border border-gray-100 bg-white/80 backdrop-blur p-6 shadow-sm">
      <div className="flex items-center gap-3 text-gray-700">
        <div className="h-10 w-10 rounded-2xl bg-gradient-to-r from-[#ff7b5c] to-[#ff3f72] flex items-center justify-center">
          <svg className="h-5 w-5 animate-spin text-white" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-30" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-90"
              d="M22 12a10 10 0 0 1-10 10"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div>
          <div className="font-semibold">Loading your order…</div>
          <div className="text-sm text-gray-500">Just a moment.</div>
        </div>
      </div>
    </div>
  );
}
