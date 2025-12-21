"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { Link } from "nextjs13-progress";

const getFirstName = (name?: string) => name?.split(" ")[0];

type Props = {
  scrollY: number;
};

export default function LoggedUser({ scrollY }: Props) {
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isTopHome = scrollY <= 0;
  const textColor = isTopHome ? "text-white" : "text-gray-900";
  const baseBtn = "px-3 py-1 rounded-xl font-semibold transition text-nowrap";

  // 🔴 Kill dropdown when screen becomes desktop
  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 768) {
        setIsDropdownOpen(false);
      }
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  // 🔴 Toggle ONLY on mobile
  const toggleDropdown = () => {
    if (window.innerWidth < 768) {
      setIsDropdownOpen((prev) => !prev);
    }
  };

  if (!session) {
    return (
      <div className={`flex gap-1 md:gap-3 ${textColor} text-xs md:text-sm`}>
        <Link
          href="/login"
          className={`${baseBtn} ${
            isTopHome ? "bg-white text-[#ff3f72]" : "bg-gray-200 text-gray-900"
          }`}
        >
          Login
        </Link>

        <Link
          href="/register"
          className={`${baseBtn} ${
            isTopHome
              ? "border border-white text-white hover:bg-white hover:text-[#ff3f72]"
              : "border border-gray-300 text-gray-900 hover:bg-gray-200"
          }`}
        >
          Register
        </Link>
      </div>
    );
  }

  return (
    <div className={`flex gap-3 items-center ${textColor} text-xs md:text-sm`}>
      {/* USER BUTTON */}
      <div className="hidden md:block">
        <Link
          href={`/profile/${session.user.id}`}
          className={`${baseBtn} ${
            isTopHome
              ? "bg-white/20 hover:bg-white/30 text-white"
              : "bg-gray-200 hover:bg-gray-300 text-gray-900"
          }`}
        >
          Hi, {getFirstName(session.user.name)}
        </Link>
      </div>
      <div className="relative md:hidden">
        <button
          onClick={toggleDropdown}
          className={`${baseBtn} ${
            isTopHome
              ? "bg-white/20 hover:bg-white/30 text-white"
              : "bg-gray-200 hover:bg-gray-300 text-gray-900"
          }`}
        >
          Hi, {getFirstName(session.user.name)}
        </button>

        {/* MOBILE DROPDOWN ONLY */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 rounded-lg border bg-white shadow-lg z-50">
            <Link
              href={`/profile/${session.user.id}`}
              onClick={() => setIsDropdownOpen(false)}
              className="block px-4 py-2 text-gray-900 hover:bg-gray-100"
            >
              Profile
            </Link>
            <button
              onClick={() => signOut()}
              className="w-full text-left px-4 py-2 text-gray-900 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* DESKTOP LOGOUT ONLY */}
      <button
        onClick={() => signOut()}
        className={`${baseBtn} hidden md:block ${
          isTopHome
            ? "bg-white/20 hover:bg-white/30 text-white"
            : "bg-gray-200 hover:bg-gray-300 text-gray-900"
        }`}
      >
        Logout
      </button>
    </div>
  );
}
