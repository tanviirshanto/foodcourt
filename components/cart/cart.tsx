"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { MdOutlineShoppingCart } from "react-icons/md";
import Item from "@/components/cart/item";
import OrderDetails from "@/components/cart/orderDetails";
import { IoMdArrowRoundBack } from "react-icons/io";
import ButtonX from "@/components/cart/buttonx";
import { CartState, CartItem } from "@/types/cart";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchCartItems, getDataFromLocal } from "@/redux/cartSlice";

const Cart: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.cart) as CartState;
  const { data: session } = useSession();
  const [addDetails, setAddDetails] = useState(false);

  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [contact, setContact] = useState<string>("");

  const shipping_charge = data?.items?.length ? 100 : 0;
  const full_total = (data?.total_amount ?? 0) + shipping_charge;

  const cartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (session?.user?.id) {
      setUserId(session.user.id as string);
      setName(session.user.name || "");
    }
  }, [session]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchCartItems({ user_id: userId }));
    } else {
      dispatch(getDataFromLocal());
    }
  }, [userId, dispatch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        cartRef.current &&
        !cartRef.current.contains(event.target as Node) &&
        open
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="max-w-screen flex justify-end relative z-50">
      {/* Toggle Cart Button */}
      <button
        className={`text-4xl absolute -top-5 z-10 ${open ? "text-white" : ""}`}
        onClick={() => setOpen(!open)}
        aria-label="Toggle cart"
      >
        <MdOutlineShoppingCart />
      </button>

      {/* Background Overlay */}
      {open && (
        <div
          className="fixed top-0 left-0 w-screen h-screen backdrop-blur-sm bg-black/30 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Cart Drawer */}
      <div
        ref={cartRef}
        className={`fixed h-screen gradient2 text-white top-0 w-screen md:w-1/2 lg:w-1/3 ${
          open ? "right-[0%]" : "-right-[120%]"
        } transition-all ease-in-out duration-500 shadow-2xl py-10 px-10 md:px-10 z-50`}
      >
        {/* Mobile Close Button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-white text-5xl md:hidden"
          aria-label="Close cart"
        >
          &times;
        </button>

        {/* Header */}
        <div className="font-bold flex items-center text-xl h-[10%]">
          {addDetails ? (
            <button
              onClick={() => setAddDetails(false)}
              className="whitespace-nowrap"
              type="button"
            >
              <IoMdArrowRoundBack /> Back
            </button>
          ) : (
            "Your Cart"
          )}
        </div>
        <hr />

        {/* Main Content */}
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
        ) : (
          <div className="h-[60%] flex flex-col gap-8 overflow-y-auto py-4">
            {data?.items?.map((it: CartItem) =>
              it ? <Item it={it} user_id={userId} key={it.id} /> : null
            )}
          </div>
        )}

        <hr />

        {/* Footer */}
        <div className="h-[30%] pt-10 flex flex-col gap-2">
          <div className="flex justify-between text-lg">
            <h1 className="font-bold text-xl">Subtotal:</h1>
            <h1>{data?.total_amount} Taka</h1>
          </div>
          <div className="flex justify-between text-lg">
            <h1 className="font-bold text-xl">Shipping:</h1>
            <h1>{shipping_charge} Taka</h1>
          </div>
          <div className="flex justify-between text-lg mb-4">
            <h1 className="font-bold text-xl">Order Total:</h1>
            <h1>{full_total} Taka</h1>
          </div>

          <ButtonX
            addDetails={addDetails}
            setAddDetails={setAddDetails}
            name={name}
            address={address}
            email={email}
            contact={contact}
            data={data}
            shipping_charge={shipping_charge}
            full_total={full_total}
            user_id={userId}
            setOpen={setOpen}
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
