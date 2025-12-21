
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function FailPage() {
  const searchParams = useSearchParams();
  const orderid = searchParams.get("orderid");
  const userId = searchParams.get("userId");

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
        className="bg-white p-10 rounded-3xl shadow-2xl text-center max-w-md"
      >
        <motion.div
          initial={{ rotate: -180 }}
          animate={{ rotate: 0 }}
          transition={{ duration: 1 }}
          className="flex justify-center"
        >
          {/* <Image src="/success-check.gif" width={150} height={150} alt="Success" /> */}
        </motion.div>
        <h1 className="text-3xl font-bold mt-6 text-red-500">Payment Failed!</h1>
        <p className="mt-4 text-lg">Try again later.</p>
        {/* <p className="mt-2 text-sm text-gray-600">Order ID: {orderid}</p>
        <p className="text-sm text-gray-600">User ID: {userId}</p> */}
      </motion.div>
    </div>
  );
}
