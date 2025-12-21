"use client";

import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function SubmitButton({
  isLoading,
  disabled,
  text,
  loadingText,
}: {
  isLoading: boolean;
  disabled?: boolean;
  text: string;
  loadingText: string;
}) {
  return (
    <button
      type="submit"
      disabled={disabled ?? isLoading}
      className="mt-2 w-full rounded-2xl px-4 py-3 text-base font-semibold text-white shadow-md transition
                 bg-gradient-to-r from-[#ff7b5c] to-[#ff3f72]
                 hover:opacity-95 active:scale-[0.99]
                 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <span className="flex items-center justify-center gap-2">
        {isLoading && (
          <AiOutlineLoading3Quarters className="animate-spin h-5 w-5" />
        )}
        {isLoading ? loadingText : text}
      </span>
    </button>
  );
}
