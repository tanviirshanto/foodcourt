// app/payment/Cancel/page.tsx
import { Suspense } from "react";
import CancelPage from "@/components/payment/CancelPage";

export default function Page() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
      <CancelPage />
    </Suspense>
  );
}
