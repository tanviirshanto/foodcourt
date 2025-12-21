"use client";

export default function AuthHeader({
  title,
  subtitle,
  icon,
}: {
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="text-center">
      <div className="mx-auto mb-4 h-12 w-12 rounded-2xl bg-gradient-to-r from-[#ff7b5c] to-[#ff3f72] flex items-center justify-center shadow-md">
        {icon}
      </div>

      <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-2 text-sm md:text-base text-gray-500">{subtitle}</p>
      )}
    </div>
  );
}
