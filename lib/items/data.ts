import Shop from "@/models/shopModel";
import type { ShopItem } from "@/types/recommended";
import { connect } from "@/dbConfig/dbConfig";
import { escapeRegex } from "@/lib/text/escapeRegex";
import type { SortKey } from "@/lib/items/query";

export type ItemsAggregatedResult = {
  items: ShopItem[];
  total: number;
  categories: string[];
  shops: string[];
};

export async function getItemsAggregated(args: {
  search: string;
  sort: SortKey;
  category: string;
  shop: string;
  page: number;
  limit: number;
}): Promise<ItemsAggregatedResult> {
  const { search, sort, category, shop, page, limit } = args;

  await connect();

  const match: Record<string, any> = {};

  // Shop filter (by shop name)
  if (shop) match.name = shop;

  // Unwind will put item fields under "items"
  if (category) match["items.category"] = category;

  if (search) {
    const q = escapeRegex(search);
    match["items.name"] = { $regex: q, $options: "i" };
  }

  const sortStage: Record<string, 1 | -1> = {};
  switch (sort) {
    case "price_asc":
      sortStage["items.price"] = 1;
      break;
    case "price_desc":
      sortStage["items.price"] = -1;
      break;
    case "name_asc":
      sortStage["items.name"] = 1;
      break;
    case "name_desc":
      sortStage["items.name"] = -1;
      break;
    default:
      sortStage["updatedAt"] = -1;
      sortStage["items.name"] = 1;
      break;
  }

  const skip = (page - 1) * limit;

  const pipeline: any[] = [
    { $unwind: "$items" },
    { $match: match },
    {
      $facet: {
        pagedItems: [
          { $sort: sortStage },
          { $skip: skip },
          { $limit: limit },
          {
            $project: {
              _id: { $toString: "$items._id" },
              shop_name: "$name",
              name: "$items.name",
              category: "$items.category",
              price: "$items.price",
              description: "$items.description",
              images: "$items.images",
              estimated_time: "$items.estimated_time",
            },
          },
        ],
        totalCount: [{ $count: "count" }],
        categories: [{ $group: { _id: "$items.category" } }, { $sort: { _id: 1 } }],
        shops: [{ $group: { _id: "$name" } }, { $sort: { _id: 1 } }],
      },
    },
  ];

  const [result] = await Shop.aggregate(pipeline);

  const items: ShopItem[] = (result?.pagedItems ?? []) as ShopItem[];
  const total: number = result?.totalCount?.[0]?.count ?? 0;

  const categories: string[] = (result?.categories ?? [])
    .map((x: any) => x._id)
    .filter(Boolean);

  const shops: string[] = (result?.shops ?? [])
    .map((x: any) => x._id)
    .filter(Boolean);

  return { items, total, categories, shops };
}
