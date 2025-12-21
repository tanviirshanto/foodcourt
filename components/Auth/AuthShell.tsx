"use client";

export default function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#fff1f2] via-white to-white flex justify-center px-6 py-10">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#ff7b5c]/25 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[#ff3f72]/25 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md mt-[100px]">{children}</div>
    </div>
  );
}
