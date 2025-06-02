// app/payment/success/page.tsx
import { Suspense } from "react";
import SuccessPage from "@/components/payment/SuccessPage";

export default function Page() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
      <SuccessPage />
    </Suspense>
  );
}
