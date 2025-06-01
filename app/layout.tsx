import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GlobalContextProvider } from "@/redux/Provider";
import Footer from "@/components/Footer/footer";
import { Next13NProgress } from "nextjs13-progress";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Good Foods, Snacks & Liquor",
  description: "Developed by Tanvir Hossen Shanto",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} font-NoirProRegular`}>
        <GlobalContextProvider>
          {children}
          <Footer />
          <Next13NProgress color="red" height={5} />
        </GlobalContextProvider>

        {/* Optional: Vercel analytics */}
        <SpeedInsights />
      </body>
    </html>
  );
}
