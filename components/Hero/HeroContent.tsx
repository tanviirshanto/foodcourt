import HeroTitle from "./HeroTitle";
import HeroActions from "./HeroActions";

export default function HeroContent() {
  return (
    <div className="text-center lg:text-left">
      <HeroTitle />
      <HeroActions />
    </div>
  );
}
