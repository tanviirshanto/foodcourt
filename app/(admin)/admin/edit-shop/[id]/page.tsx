import EditShopForm from "@/components/shop/EditShopForm";

export default function EditShopPage({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <EditShopForm shopId={params.id} />
    </main>
  );
}
