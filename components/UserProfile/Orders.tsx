import { useState } from "react";
import { Link } from "nextjs13-progress";
import { SingleOrder } from "@/types/order";
import { findDate } from "@/utils/findDate";

function Orders({ orders, user }) {
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="py-6 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Title Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">Order History</h2>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Order ID</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Date</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Details</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Total Amount</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Payment Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Delivery Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentOrders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{order._id}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{findDate(order.order_date)}</td>
                <td className="px-6 py-4 text-sm">
                  <Link href={`/view_order/${order._id}`} className="text-blue-600 hover:underline">View</Link>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">BDT. {order.full_total}</td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`px-3 py-1 inline-block rounded-full text-white ${
                      order.payment === "pending" ? "bg-red-500" : "bg-green-500"
                    }`}
                  >
                    {order.payment}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">{order.shipping}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-400 transition"
        >
          Previous
        </button>

        <span className="text-lg font-medium text-gray-700">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-400 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Orders;
