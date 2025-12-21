"use client";

import { GlobalContextProvider } from "@/redux/Provider";
import { Next13NProgress } from "nextjs13-progress";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GlobalContextProvider>
      {children}
      <Next13NProgress color="red" height={4} />
    </GlobalContextProvider>
  );
}
