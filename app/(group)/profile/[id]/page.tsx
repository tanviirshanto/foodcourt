import User from "@/models/userModel";
import Order from "@/models/orderModel";
import Index from "@/components/profile/index";
import { connect } from "@/dbConfig/dbConfig";
connect();
async function GetUser(id: string) {
  const p = await User.findOne({ _id: id });

  return p;
}

async function GetOrder(userid: string) {
  const p = await Order.findOne({ user_id: userid });
  // const sorted_orders = p?.orders
  //  console.log(p?.orders);
  return p?.orders.toObject();
}

export default async function Profile({ params }: any) {
  const user = await GetUser(params.id);
  const orders = await GetOrder(params.id)

  return (
    <div
      className="text-sm text-[
#C6C1B9] md:py-32   pt-24   min-h-screen "
    ><h1 className="text-2xl lg:text-5xl font-NoirProRegular my-10 flex justify-center ">{user.name }</h1>
      <Index user={user} orders={orders} />
    </div>
  );
}
