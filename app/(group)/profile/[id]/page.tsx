import { connect } from "@/dbConfig/dbConfig";
import User, { UserDocument } from "@/models/userModel";
import Order from "@/models/orderModel";
import ProfileIndex from "@/components/profile";
import { SingleOrder } from "@/types/order";

connect();

// Convert Mongoose ObjectId and Date to strings
function serializeUser(user: any): any {
  return {
    ...user,
    _id: user._id.toString(),
  };
}

function serializeOrders(data: any): SingleOrder[] {
  return (data?.orders || []).map((order: any) => ({
    ...order,
    _id: order._id.toString(),
    order_date: order.order_date?.toISOString(),
    items: order.items.map((item: any) => ({
      ...item,
      _id: item._id.toString(),
    })),
  }));
}

async function getUser(id: string): Promise<any> {
  const user = await User.findById(id).lean();
  return user ? serializeUser(user) : null;
}

async function getOrders(userId: string): Promise<SingleOrder[]> {
  const data = await Order.findOne({ user_id: userId }).lean();
  return serializeOrders(data);
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
