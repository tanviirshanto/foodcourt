"use client";

import type { ShopItem } from "@/types/recommended";
import RecomGrid from "./RecomGrid";
import SectionHeader from "../Common/SectionHeader";

export default function Recom({ items }: { items: ShopItem[] }) {
  return (
    <div className="mt-16 px-5 lg:px-20">
      <SectionHeader text="Our Top Picks" />
      <RecomGrid items={items} />
    </div>
  );
}
