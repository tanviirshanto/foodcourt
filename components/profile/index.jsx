"use client";
import React, { useState } from "react";
import ProfileMenu from "@/components/profile/profilemenu";
import Info from "@/components/profile/info";
import Orders from "@/components/profile/orders";

const Index = ({ user, orders }) => {
  const [menu, setMenu] = useState(1);
  const sortedOrders=orders?.sort(
    (a, b) => b.order_date - a.order_date
  );
  return (
    <div className="flex lg:flex-row flex-col justify-center gap-8 lg:gap-24 mb-10">
      <div className="w-screen lg:w-[20%]">
        <ProfileMenu setMenu={setMenu} menu={menu} />
      </div>
      <hr/>
      <div className="w-screen lg:w-[70%]">
        {menu === 1 && <Info user={user} />}
        {menu === 2 && <Orders orders={sortedOrders} user={user} />}
      </div>
    </div>
  );
};

export default Index;
