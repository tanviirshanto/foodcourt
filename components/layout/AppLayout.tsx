import Footer from "@/components/Footer/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Footer />
      <SpeedInsights />
    </>
  );
}
