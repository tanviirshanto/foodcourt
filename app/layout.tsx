import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Next13NProgress, Link } from "nextjs13-progress";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Food Court",
  description: "Fastest Food Service Ever",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>

          {children}

        {/* <Footer /> */}
        <Next13NProgress color="red" height={5} />
        
        
      </body>
    </html>
  );
}
