import { clampInt } from "@/lib/number/clampInt";

export type SortKey = "price_asc" | "price_desc" | "name_asc" | "name_desc" | "";

export type ItemsQuery = {
  search: string;
  sort: SortKey;
  category: string;
  shop: string;
  page: number;
  limit: number;
};

export function parseItemsQuery(searchParams?: {
  search?: string;
  sort?: string;
  category?: string;
  shop?: string;
  page?: string;
  limit?: string;
}): ItemsQuery {
  const search = (searchParams?.search ?? "").trim();
  const sort = (searchParams?.sort ?? "") as SortKey;
  const category = (searchParams?.category ?? "").trim();
  const shop = (searchParams?.shop ?? "").trim();

  const page = clampInt(parseInt(searchParams?.page ?? "1", 10) || 1, 1, 999999);
  const limit = clampInt(parseInt(searchParams?.limit ?? "12", 10) || 12, 6, 60);

  return { search, sort, category, shop, page, limit };
}
