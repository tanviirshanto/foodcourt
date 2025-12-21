
"use client";

import Link from "next/link";

export default function AuthFooter({
  question,
  linkText,
  href,
}: {
  question: string;
  linkText: string;
  href: string;
}) {
  return (
    <div className="mt-6 text-center text-sm text-gray-600">
      {question}{" "}
      <Link
        href={href}
        className="font-semibold bg-gradient-to-r from-[#ff7b5c] to-[#ff3f72] bg-clip-text text-transparent hover:opacity-80"
      >
        {linkText}
      </Link>
    </div>
  );
}
