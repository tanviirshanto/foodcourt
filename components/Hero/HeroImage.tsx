import Image from "next/image";

export default function HeroImage() {
  return (
    <div className="flex justify-center relative">
      <Image
        src="/hero.png"
        width={520}
        height={700}
        alt="hero"
        className="w-full max-w-[420px] drop-shadow-[0_10px_40px_rgba(255,80,80,0.25)]"
      />

      <Floating label="🍔 Burger" className="-top-6 left-6 rotate-[-10deg]" />
      <Floating label="🍟 Fries" className="top-10 -right-4 rotate-[8deg]" />
      <Floating label="🍕 Pizza" className="bottom-6 -left-4 rotate-[6deg]" />
      <Floating label="🥤 Drinks" className="bottom-6 -right-4 rotate-[8deg]" />
    </div>
  );
}

function Floating({
  label,
  className,
}: {
  label: string;
  className: string;
}) {
  return (
    <span
      className={`absolute bg-white shadow-lg rounded-2xl px-4 py-2 text-lg ${className}`}
    >
      {label}
    </span>
  );
}
