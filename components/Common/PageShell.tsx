
"use client";

import React from "react";

export default function PageShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`min-h-screen w-full bg-gradient-to-b from-[#fff1f2] via-white to-white ${className}`}
    >
      {/* Decorative blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#ff7b5c]/25 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[#ff3f72]/25 blur-3xl" />
      </div>
      {children}
    </div>
  );
}
