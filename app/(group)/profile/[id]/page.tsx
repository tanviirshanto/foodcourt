import { connect } from "@/dbConfig/dbConfig";

import { SingleOrder } from "@/types/order";
import { getUser } from "@/utils/getUser";
import { getOrders } from "@/utils/getOrders";
import ProfileIndex from "@/components/UserProfile/ProfileIndex";

connect();

export default async function ProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const user = await getUser(params.id);
  const orders = await getOrders(params.id);

  if (!user)
    return (
      <div className="text-center text-xl text-red-600">User not found</div>
    );

  return (
    <div className="text-[#C6C1B9] pt-24 md:py-32 min-h-screen px-6">
      <h1 className="text-2xl lg:text-5xl font-semibold text-center mb-10">
        {user.name}
      </h1>
      <ProfileIndex user={user} orders={orders} />
    </div>
  );
}
