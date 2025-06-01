// app/profile/[id]/page.tsx
import { connect } from "@/dbConfig/dbConfig";
import User, { UserDocument } from "@/models/userModel";
import Order from "@/models/orderModel";
import ProfileIndex from "@/components/profile";


connect();

async function getUser(id: string): Promise<UserDocument | null> {
  return User.findById(id).lean();
}

async function getOrders(userId: string) {
  const data = await Order.findOne({ user_id: userId }).lean();
  return data?.orders || [];
}


export default async function ProfilePage({ params }: { params: { id: string } }) {
  const user = await getUser(params.id);
  const orders = await getOrders(params.id);

  if (!user) return <div className="text-center text-xl text-red-600">User not found</div>;

  return (
    <div className="text-[#C6C1B9] pt-24 md:py-32 min-h-screen px-6">
      <h1 className="text-2xl lg:text-5xl font-semibold text-center mb-10">{user.name}</h1>
      <ProfileIndex user={user} orders={orders} />
    </div>
  );
}
