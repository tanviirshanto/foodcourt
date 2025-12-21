import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useState } from "react";

interface UseOrderProps {
  user_id: string | null;
  setOpen: (v: boolean) => void;
}

export function useOrder({ user_id, setOpen }: UseOrderProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const placeOrder = async (orderData: any) => {
    if (!user_id) {
      router.push("/register");
      return;
    }

    const { name, address, email, contact } = orderData;

    if (!name || !address || !email || !contact) {
      toast.error("Please provide correct details");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post("/api/order/placeorder", {
        user_id,
        orderData,
      });

      router.push(`/checkout/${user_id}/${response.data.order._id}`);
      setOpen(false);
    } catch (error: any) {
      console.error(error);
      toast.error("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return { placeOrder, loading };
}
