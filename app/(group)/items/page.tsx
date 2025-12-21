import ItemsToolbar from "@/components/Items/ItemsToolbar";
import ItemsToolbarMobile from "@/components/Items/ItemsToolbarMobile";
import { parseItemsQuery } from "@/lib/items/query";
import { getItemsAggregated } from "@/lib/items/data";
import { clampInt } from "@/lib/number/clampInt";
import ItemsEmptyState from "@/components/Items/ItemsEmptyState";
import ItemsGrid from "@/components/Items/ItemsGrid";
import ItemsPagination from "@/components/Items/ItemsPagination";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams?: {
    search?: string;
    sort?: string;
    category?: string;
    shop?: string;
    page?: string;
    limit?: string;
  };
};

export default async function ItemsPage({ searchParams }: PageProps) {
  const q = parseItemsQuery(searchParams);

  const first = await getItemsAggregated(q);

  const totalPages = Math.max(1, Math.ceil(first.total / q.limit));
  const safePage = clampInt(q.page, 1, totalPages);

  const finalData =
    safePage === q.page ? first : await getItemsAggregated({ ...q, page: safePage });

  const baseParams = {
    search: q.search,
    sort: q.sort,
    category: q.category,
    shop: q.shop,
    limit: q.limit,
  };

  return (
    <main className="max-w-7xl mx-auto px-6 md:px-12 py-12">
      {/* HEADER */}
      <div className="mb-8 mt-8 lg:mt-14">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
          All Items
        </h1>
      </div>

      {/* Mobile */}
      <ItemsToolbarMobile categories={finalData.categories} shops={finalData.shops} />

      {/* Desktop */}
      <ItemsToolbar
        categories={finalData.categories}
        shops={finalData.shops}
        total={finalData.total}
      />

      {/* ITEMS GRID */}
      {finalData.items.length === 0 ? (
        <ItemsEmptyState />
      ) : (
        <ItemsGrid items={finalData.items} />
      )}

      {/* PAGINATION */}
      <ItemsPagination
        basePath="/items"
        baseParams={baseParams}
        page={safePage}
        totalPages={totalPages}
      />
    </main>
  );
}
