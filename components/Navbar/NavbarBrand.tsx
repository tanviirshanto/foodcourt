import { Link } from "nextjs13-progress";

type Props = {
  scrollY: number;
};

export default function NavbarBrand({ scrollY }: Props) {
  const topGradient = "text-white";
  const scrolledNav = " text-red-600 ";

  // Use scrollY to determine navbar styles
  const navbarClasses = scrollY > 0 ? scrolledNav : topGradient;

  return (
    <h1 className="font-extrabold font-NoirProBold tracking-tight leading-none">
      <Link
        href="/"
        className={`inline-flex items-baseline gap-2 whitespace-nowrap text-xl sm:text-2xl md:text-3xl lg:text-4xl`}
        aria-label="Food Court home"
      >
        <span className={`${navbarClasses} `}>FOOD</span>
        <span className={`${navbarClasses} `}>COURT</span>
      </Link>
    </h1>
  );
}
