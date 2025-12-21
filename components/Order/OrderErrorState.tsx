"use client";

export default function OrderErrorState({ message }: { message: string }) {
  if (!message) return null;

  return (
    <div className="rounded-3xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm font-semibold text-rose-700">
      {message}
    </div>
  );
}
