
import { useState } from "react";
import { Link } from "nextjs13-progress";
import React from "react";

const findDate = (timestamp) => {
  const date = new Date(timestamp);
  // Extracting date components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based
  const day = String(date.getDate()).padStart(2, "0");

  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
};

function Orders({ orders, user }) {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  // Calculate the orders to display on the current page
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Calculate total pages
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  // Handlers for page navigation
  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="">
      <div className="ml-3 lg:text-xl md:ml-3 font-bold mb-3">
        Order History
      </div>
      <hr />
      <div className="overflow-x-auto">
        <div className="">
          <table className="w-full text-sm lg:text-lg text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="pr-6 pl-3 py-3">
                  Order ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Details
                </th>
                <th scope="col" className="px-6 py-3">
                  Total Amount
                </th>
                <th scope="col" className="px-6 py-3">
                  Payment Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Delivery Status
                </th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={order._id}
                >
                  <th
                    scope="row"
                    className="pl-3 py-4 font-medium text-gray-900 dark:text-white text-wrap md:w-10"
                  >
                    {order._id}
                  </th>
                  <td className="px-6 py-4">{findDate(order.order_date)}</td>
                  <td className="px-6 py-4">
                    <Link href={`/view_order/${order._id}`} className="text-green-500">View</Link>
                  </td>
                  <td className="px-6 py-4">BDT {order.full_total}</td>
                  <td className="px-6 py-4 flex justify-between gap-2">
                    <h1>{order.payment}</h1>
                    {order.payment === "pending" && (
                      <Link
                        href={`/payment/${user._id}/${order._id}`}
                        className="text-red-600 hover:text-red-900"
                      >
                        Pay now
                      </Link>
                    )}
                  </td>
                  <td className="px-6 py-4">{order.shipping}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Pagination controls */}
      <div className="flex justify-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Orders;
