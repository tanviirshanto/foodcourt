import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";

export default function Hero() {
  return (
    <section className="relative bg-[#fff5ec] overflow-hidden">
      <HeroBackground />

      <div className="relative px-6 lg:px-20 pt-32 pb-20 grid lg:grid-cols-2 gap-16 items-center">
        <HeroContent />
        <HeroImage />
      </div>
    </section>
  );
}
