"use client";

import { useEffect, useMemo, useState } from "react";
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

// ✅ Fixed width for each control (mobile full, desktop fixed)
const CONTROL_WRAP = "w-full sm:w-60 lg:w-56 xl:w-64"; // tune if you want

const CONTROL_BASE =
  "mt-2 w-full border border-gray-300 rounded-xl px-4 py-2 bg-white outline-none focus:ring-2 focus:ring-black/20";

export default function ItemsToolbar({
  categories,
  shops,
  total,
}: {
  categories: string[];
  shops: string[];
  total: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // read current params
  const currentSearch = searchParams.get("search") ?? "";
  const currentSort = (searchParams.get("sort") ?? "") as SortKey;
  const currentCategory = searchParams.get("category") ?? "";
  const currentShop = searchParams.get("shop") ?? "";
  const currentLimit = searchParams.get("limit") ?? "12";

  // local state for search (debounced)
  const [search, setSearch] = useState(currentSearch);

  // keep input synced if user navigates back/forward
  useEffect(() => setSearch(currentSearch), [currentSearch]);

  // debounced search → URL update (reset page)
  useEffect(() => {
    const t = setTimeout(() => {
      const qs = buildQuery(searchParams, { search, page: "1" });
      router.push(qs ? `${pathname}?${qs}` : pathname);
    }, 350);

    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const applySelect = (patch: Record<string, string>) => {
    const qs = buildQuery(searchParams, { ...patch, page: "1" });
    router.push(qs ? `${pathname}?${qs}` : pathname);
  };

  const clearAll = () => router.push(pathname);

  const hasFilters = useMemo(() => {
    return (
      !!currentSearch ||
      !!currentSort ||
      !!currentCategory ||
      !!currentShop ||
      currentLimit !== "12"
    );
  }, [currentSearch, currentSort, currentCategory, currentShop, currentLimit]);

  return (
    <div className="mb-10 hidden lg:block">
      {/* Top row */}
      <div className="flex justify-between gap-4">
        {/* Search (fixed width, not flex-1) */}
        <div className={CONTROL_WRAP}>
          <label className="text-sm font-semibold text-gray-700">Search</label>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search items..."
            className={`${CONTROL_BASE} bg-white`}
          />
        </div>

        {/* Filters (fixed-size fields) */}

        {/* Shop */}
        <div className={CONTROL_WRAP}>
          <label className="text-sm font-semibold text-gray-700">Shop</label>
          <select
            value={currentShop}
            onChange={(e) => applySelect({ shop: e.target.value })}
            className={`${CONTROL_BASE} truncate`}
          >
            <option value="">All shops</option>
            {shops.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Category */}
        <div className={CONTROL_WRAP}>
          <label className="text-sm font-semibold text-gray-700">
            Category
          </label>
          <select
            value={currentCategory}
            onChange={(e) => applySelect({ category: e.target.value })}
            className={`${CONTROL_BASE} truncate`}
          >
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div className={CONTROL_WRAP}>
          <label className="text-sm font-semibold text-gray-700">Sort</label>
          <select
            value={currentSort}
            onChange={(e) => applySelect({ sort: e.target.value })}
            className={`${CONTROL_BASE} truncate`}
          >
            <option value="">Default</option>
            <option value="price_asc">Price: Low → High</option>
            <option value="price_desc">Price: High → Low</option>
            <option value="name_asc">Name: A → Z</option>
            <option value="name_desc">Name: Z → A</option>
          </select>
        </div>

        {/* Per page */}
        <div className={CONTROL_WRAP}>
          <label className="text-sm font-semibold text-gray-700">
            Per page
          </label>
          <select
            value={currentLimit}
            onChange={(e) => applySelect({ limit: e.target.value })}
            className={`${CONTROL_BASE} truncate`}
          >
            <option value="12">12</option>
            <option value="18">18</option>
            <option value="24">24</option>
            <option value="36">36</option>
          </select>
        </div>
      </div>

      {/* Bottom row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-5">
        <p className="text-sm text-gray-600">
          Showing <span className="font-semibold">{total}</span> results
        </p>

        <button
          onClick={clearAll}
          disabled={!hasFilters}
          className={`px-5 py-2 rounded-xl border transition ${
            hasFilters
              ? "border-gray-300 hover:bg-gray-50"
              : "border-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          Clear filters
        </button>
      </div>
    </div>
  );
}
