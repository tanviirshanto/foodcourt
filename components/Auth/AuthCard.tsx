"use client";

export default function AuthCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-3xl bg-white/80 backdrop-blur border border-gray-100 shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-8 md:p-10">
      {children}
    </div>
  );
}
