"use client";

import { useState } from "react";
import ProfileMenu from "./profilemenu";
import Info from "./info";
import Orders from "./orders";
import { UserDocument } from "@/models/userModel";
import { SingleOrder } from "@/types/order";

interface Props {
  user: UserDocument;
  orders: SingleOrder[];
}


export default function ProfileIndex({ user, orders }: Props) {
  const [menu, setMenu] = useState(1);
  const sortedOrders = [...orders].sort((a, b) => new Date(b.order_date).getTime() - new Date(a.order_date).getTime());

  return (
    <div className="flex flex-col lg:flex-row justify-center gap-8 lg:gap-24 mb-10">
      <aside className="w-full lg:w-1/5">
        <ProfileMenu menu={menu} setMenu={setMenu} />
      </aside>
      <main className="w-full lg:w-4/5">
      {menu === 1 && <Orders orders={sortedOrders} user={user} />}
        {menu === 2 && <Info user={user} />}
        
      </main>
    </div>
  );
}
