"use client";

import { useMemo } from "react";

export function useOrderMetrics(items: any[]) {
  const itemsTotal = useMemo(() => {
    return items.reduce(
      (sum: number, it: any) =>
        sum + (Number(it.price) || 0) * (Number(it.quantity) || 0),
      0
    );
  }, [items]);

  const estTotalTime = useMemo(() => {
    return items.reduce(
      (sum: number, it: any) =>
        sum + (Number(it.estimated_time) || 0) * (Number(it.quantity) || 0),
      0
    );
  }, [items]);

  return { itemsTotal, estTotalTime };
}
