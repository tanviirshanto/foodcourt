"use client";

import type { Recommended } from "@/types/recommended";
import RecomGrid from "./RecomGrid";
import SectionHeader from "../Common/SectionHeader";

export default function Recom({ items }: { items: Recommended[] }) {
  return (
    <div className="mt-16 px-5 lg:px-20">
      <SectionHeader text="Our Top Picks" />
      <RecomGrid items={items} />
    </div>
  );
}
