type Props = {
  scrollY: number;
  children: React.ReactNode;
};

export default function NavbarContainer({ scrollY, children }: Props) {
  const topGradient = "bg-gradient-to-r from-[#ff7b5c] to-[#ff3f72] text-white";
  const scrolledNav = "bg-white text-gray-900 shadow-md";

  // Use scrollY to determine navbar styles
  const navbarClasses = scrollY > 0 ? scrolledNav : topGradient;

  return (
    <div
      className={`transition-all duration-500 fixed w-screen flex justify-between items-center px-3 md:px-8 lg:px-14 py-4 ${navbarClasses} z-40 top-0`}
    >
      {children}
    </div>
  );
}
