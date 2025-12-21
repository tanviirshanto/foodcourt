"use client";

type Props = {
  label: string;
  id: string;
  name: string;
  type: string;
  placeholder?: string;
  autoComplete?: string;
  value: string;
  onChange: (v: string) => void;
  leftIcon?: React.ReactNode;
  required?: boolean;
};

export default function TextField({
  label,
  id,
  name,
  type,
  placeholder,
  autoComplete,
  value,
  onChange,
  leftIcon,
  required = false,
}: Props) {
  return (
    <div>
      <label htmlFor={id} className="block mb-2 text-sm font-semibold text-gray-800">
        {label}
      </label>

      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {leftIcon}
          </div>
        )}

        <input
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-2xl border border-gray-200 bg-white px-10 py-3 text-sm text-gray-900 shadow-sm outline-none transition
                     focus:border-[#ff3f72] focus:ring-4 focus:ring-[#ff3f72]/15"
        />
      </div>
    </div>
  );
}
