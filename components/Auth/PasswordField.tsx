"use client";

import { FaKey } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function PasswordField({
  value,
  onChange,
  show,
  toggleShow,
}: {
  value: string;
  onChange: (v: string) => void;
  show: boolean;
  toggleShow: () => void;
}) {
  return (
    <div>
      <label
        htmlFor="password"
        className="block mb-2 text-sm font-semibold text-gray-800"
      >
        Password
      </label>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <FaKey className="text-gray-400" />
        </div>

        <input
          id="password"
          name="password"
          type={show ? "text" : "password"}
          autoComplete="new-password"
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-2xl border border-gray-200 bg-white px-10 py-3 pr-12 text-sm text-gray-900 shadow-sm outline-none transition
                     focus:border-[#ff3f72] focus:ring-4 focus:ring-[#ff3f72]/15"
          placeholder="********"
        />

        <button
          type="button"
          onClick={toggleShow}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 transition hover:text-gray-700 focus:outline-none"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <FiEyeOff /> : <FiEye />}
        </button>
      </div>

      <p className="mt-2 text-xs text-gray-500">
        Tip: use 8+ characters with a number for a stronger password.
      </p>
    </div>
  );
}
