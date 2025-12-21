interface SectionHeaderProps {
  text: string;
  gradient?: boolean;
}

export default function SectionHeader({
  text,
  gradient = true,
}: SectionHeaderProps) {
  return (
    <h2
      className={`text-center font-extrabold text-3xl md:text-5xl mb-10 ${
        gradient
          ? "bg-gradient-to-r from-[#ff7b5c] to-[#ff3f72] bg-clip-text text-transparent"
          : "text-[#ff3f72]"
      }`}
    >
      {text}
    </h2>
  );
}
