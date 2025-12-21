"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

export function useOrderDetails(orderId: string) {
  const { data: session, status } = useSession();

  const [user_id, setUser_id] = useState<string | null>(null);
  const [order, setOrder] = useState<any>(null);
  const [loadingOrder, setLoadingOrder] = useState(false);
  const [fetchError, setFetchError] = useState<string>("");

  useEffect(() => {
    if (session?.user?.id && !user_id) {
      setUser_id(String(session.user.id));
    }
  }, [session, user_id]);

  useEffect(() => {
    if (!user_id) return;

    setLoadingOrder(true);
    setFetchError("");

    axios
      .get(`/api/order/getorder/${user_id}/${orderId}`)
      .then((response) => setOrder(response.data))
      .catch((error) => {
        console.error("Error fetching the order:", error);
        setFetchError("Couldn’t load this order. Please try again.");
      })
      .finally(() => setLoadingOrder(false));
  }, [user_id, orderId]);

  return { status, user_id, order, loadingOrder, fetchError };
}
