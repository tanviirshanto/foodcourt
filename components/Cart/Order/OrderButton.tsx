"use client";

import { useOrder } from "@/hooks/Order/useOrder";
import { GrLinkNext } from "react-icons/gr";

interface OrderButtonProps {
  addDetails: boolean;
  setAddDetails: (v: boolean) => void;
  orderData: any;
  user_id: string | null;
  setOpen: (v: boolean) => void;
}

export default function OrderButton({
  addDetails,
  setAddDetails,
  orderData,
  user_id,
  setOpen,
}: OrderButtonProps) {
  const { placeOrder, loading } = useOrder({ user_id, setOpen });

  const handleClick = () => {
    if (!addDetails) {
      setAddDetails(true);
    } else {
      placeOrder(orderData);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="relative w-full py-4 bg-[#41a4c8] rounded-md text-xl font-semibold text-white flex justify-center items-center gap-1 group cursor-pointer"
    >
      <span className="group-hover:-translate-x-2 transition-transform">
        {addDetails ? "Checkout" : "Add Order Details"}
      </span>

      <span className="font-extrabold group-hover:translate-x-2 transition-transform">
        <GrLinkNext />
      </span>

      {loading && (
        <div className="absolute inset-0 bg-white/60 flex justify-center items-center rounded-md">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        </div>
      )}
    </div>
  );
}
