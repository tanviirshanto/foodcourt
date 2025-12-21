"use client";

import { useState } from "react";
import { useCart } from "@/hooks/Cart/useCart";
import { useCartDrawer } from "@/hooks/Cart/useCartDrawer";
import { MdOutlineShoppingCart, MdClose } from "react-icons/md";
import CartItemRow from "./Item/CartItemRow";
import OrderButton from "./Order/OrderButton";
import OrderDetails from "./Order/OrderDetails";

export default function Cart() {
  const { cart, userId, shipping, subtotal, total } = useCart();
  const { open, setOpen, ref } = useCartDrawer();

  const [addDetails, setAddDetails] = useState(false);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");

  const isEmpty = !cart?.items || cart.items.length === 0;

  const orderData = {
    order_date: new Date(),
    name,
    address,
    email,
    contact,
    items: cart?.items ?? [],
    shipping: "pending",
    shipping_charge: shipping,
    payment: "pending",
    full_total: total,
  };

  return (
    <>
      {/* CART BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="hidden md:block bg-gradient-to-r from-[#ff7b5c] to-[#ff3f72] p-3 rounded-full text-white"
      >
        <MdOutlineShoppingCart className="text-3xl" />
      </button>

      <button
        onClick={() => setOpen(true)}
        className="fixed right-8 bottom-8 md:hidden bg-gradient-to-r from-[#ff7b5c] to-[#ff3f72] p-3 rounded-full text-white"
      >
        <MdOutlineShoppingCart className="text-2xl" />
      </button>

      {open && <div className="fixed inset-0 bg-black/40" />}

      {/* DRAWER */}
      <div
        ref={ref}
        className={`fixed top-0 right-0 h-screen w-full md:w-1/2 lg:w-1/3 bg-white transition ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col h-full">
          {/* CLOSE BUTTON */}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-2 left-4 rounded-full p-2 text-gray-500 hover:bg-gray-100 transition"
            aria-label="Close cart"
          >
            <MdClose className="text-2xl" />
          </button>

          {/* CONTENT */}
          <div className="flex-1 overflow-y-auto mt-8 space-y-4">
            {addDetails ? (
              <OrderDetails
                name={name}
                setName={setName}
                address={address}
                setAddress={setAddress}
                email={email}
                setEmail={setEmail}
                contact={contact}
                setContact={setContact}
              />
            ) : cart?.items?.length === 0 ? (
              /* EMPTY STATE */
              <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 gap-4">
                <MdOutlineShoppingCart className="text-6xl text-[#ff7b5c]" />
                <p className="text-lg font-semibold">Your cart is empty</p>
                <p className="text-sm text-gray-400">
                  Add some delicious items to get started 🍔🍕
                </p>
              </div>
            ) : (
              cart.items.map((it) => (
                <CartItemRow key={it.id} item={it} userId={userId} />
              ))
            )}
          </div>

          {/* FOOTER (hide when empty) */}
          {!isEmpty && (
            <div className="border-t pt-5 space-y-4 bg-white">
              {/* Price breakdown */}
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>BDT {subtotal}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>BDT {shipping}</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center text-lg font-semibold text-gray-900 border-t pt-3">
                <span>Total</span>
                <span className="bg-gradient-to-r from-[#ff7b5c] to-[#ff3f72] bg-clip-text text-transparent">
                  BDT {total}
                </span>
              </div>

              {/* CTA */}
              <div className="pt-2">
                <OrderButton
                  addDetails={addDetails}
                  setAddDetails={setAddDetails}
                  orderData={orderData}
                  user_id={userId}
                  setOpen={setOpen}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
