"use client";
import Cart from "@/components/Cart/Cart";
import { Next13NProgress } from "nextjs13-progress";
import LoggedUser from "./LoggedUser";
import NavbarBrand from "./NavbarBrand";
import NavbarContainer from "./NavbarContainer";
import { useNavbarScroll } from "@/hooks/useNavbarScroll";

export default function Navbar() {
  const scrollY = useNavbarScroll();

  return (
    <div className="z-50">
      <NavbarContainer scrollY={scrollY}>
        <NavbarBrand scrollY={scrollY} />

        <div className="flex items-center gap-2 md:gap-6">
          <Cart />
          <LoggedUser scrollY={scrollY} />
        </div>

        <Next13NProgress color="red" height={5} />
      </NavbarContainer>
    </div>
  );
}
