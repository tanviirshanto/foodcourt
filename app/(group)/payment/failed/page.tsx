// app/payment/Fail/page.tsx
import { Suspense } from "react";
import FailPage from "@/components/payment/FailPage";

export default function Page() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
      <FailPage />
    </Suspense>
  );
}
