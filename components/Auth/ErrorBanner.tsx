"use client";

export default function ErrorBanner({ message }: { message: string }) {
  if (!message) return null;

  return (
    <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm font-semibold text-red-700">
      {message}
    </div>
  );
}
