"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type SortKey = "price_asc" | "price_desc" | "name_asc" | "name_desc" | "";

function buildQuery(
  current: URLSearchParams,
  patch: Record<string, string | null | undefined>
) {
  const sp = new URLSearchParams(current.toString());

  Object.entries(patch).forEach(([key, value]) => {
    const v = (value ?? "").trim();
    if (!v) sp.delete(key);
    else sp.set(key, v);
  });

  return sp.toString();
}

export default function ItemsToolbarMobile({
  categories,
  shops,
}: {
  categories: string[];
  shops: string[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get("search") ?? "";
  const currentSort = (searchParams.get("sort") ?? "") as SortKey;
  const currentCategory = searchParams.get("category") ?? "";
  const currentShop = searchParams.get("shop") ?? "";

  const [search, setSearch] = useState(currentSearch);

  // keep input synced
  useEffect(() => setSearch(currentSearch), [currentSearch]);

  // debounce search
  useEffect(() => {
    const t = setTimeout(() => {
      const qs = buildQuery(searchParams, { search, page: "1" });
      router.push(qs ? `${pathname}?${qs}` : pathname);
    }, 350);

    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const apply = (patch: Record<string, string>) => {
    const qs = buildQuery(searchParams, { ...patch, page: "1" });
    router.push(qs ? `${pathname}?${qs}` : pathname);
  };

  return (
    <div className="lg:hidden mb-6">
      {/* Search + Sort */}
      <div className="flex gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="flex-1 border border-gray-300 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-black/20"
        />

        <select
          value={currentSort}
          onChange={(e) => apply({ sort: e.target.value })}
          className="border border-gray-300 rounded-xl px-3 py-2 text-sm bg-white"
        >
          <option value="">Sort</option>
          <option value="price_asc">Price ↑</option>
          <option value="price_desc">Price ↓</option>
          <option value="name_asc">A–Z</option>
          <option value="name_desc">Z–A</option>
        </select>
      </div>

      {/* Filters (collapsible) */}
      <details className="mt-3 rounded-xl border border-gray-300">
        <summary className="px-4 py-2 text-sm font-semibold cursor-pointer select-none">
          Filters
        </summary>

        <div className="p-4 flex flex-col gap-3">
          {/* Shop */}
          <select
            value={currentShop}
            onChange={(e) => apply({ shop: e.target.value })}
            className="border border-gray-300 rounded-xl px-4 py-2 text-sm bg-white"
          >
            <option value="">All shops</option>
            {shops.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          {/* Category */}
          <select
            value={currentCategory}
            onChange={(e) => apply({ category: e.target.value })}
            className="border border-gray-300 rounded-xl px-4 py-2 text-sm bg-white"
          >
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <button
            onClick={() => router.push(pathname)}
            className="border border-gray-300 rounded-xl px-4 py-2 text-sm hover:bg-gray-50"
          >
            Clear filters
          </button>
        </div>
      </details>
    </div>
  );
}
