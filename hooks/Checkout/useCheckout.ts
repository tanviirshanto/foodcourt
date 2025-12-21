"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export function useCheckout(userId: string | undefined, orderId: string | undefined) {
  const [order, setOrder] = useState<any>(null);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [fetchError, setFetchError] = useState<string>("");

  useEffect(() => {
    if (!userId || !orderId) return;

    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setFetchError("");

        const [orderRes, userRes] = await Promise.all([
          axios.get(`/api/order/getorder/${userId}/${orderId}`, { signal: controller.signal }),
          axios.get(`/api/user/${userId}`, { signal: controller.signal }),
        ]);

        setOrder(orderRes.data);
        setUserInfo(userRes.data.data);
      } catch (error: any) {
        // Ignore cancellations
        if (error?.name === "CanceledError" || error?.code === "ERR_CANCELED") return;

        console.error("Error fetching order/user:", error);
        setFetchError("Couldn’t load checkout details. Please refresh and try again.");
      }
    };

    fetchData();

    return () => controller.abort();
  }, [userId, orderId]);

  return { order, userInfo, fetchError };
}
