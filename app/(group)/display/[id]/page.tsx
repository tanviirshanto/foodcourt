import { connect } from "@/dbConfig/dbConfig";
import Shop from "@/models/shopModel";
import { ShopType } from "@/types/shop";
import ShopHeroSection from "@/components/Shop/ShopHeroSection";
import ShopSubtitle from "@/components/Shop/ShopSubtitle";
import ShopItemsGrid from "@/components/Shop/ShopItemsGrid";

export const dynamic = "force-dynamic";

interface Params {
  params: {
    id: string;
    role: string;
  };
}

// Server-side fetch
async function getShopItems(id: string): Promise<ShopType | null> {
  await connect();
  const shop = await Shop.findOne({ _id: id }).lean();
  return shop as ShopType;
}

export default async function Page({ params }: Params) {
  const shop = await getShopItems(params.id);

  if (!shop)
    return (
      <div className="text-center py-20 text-gray-500">Shop not found</div>
    );

  return (
    <main className="min-h-screen bg-[#f9fbfd] text-gray-800">
      <ShopHeroSection shop={shop} />
      <ShopSubtitle shop={shop} />
      <ShopItemsGrid items={shop.items} />
    </main>
  );
}
