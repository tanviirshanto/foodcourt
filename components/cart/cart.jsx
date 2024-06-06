"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { MdOutlineShoppingCart } from "react-icons/md";
import Item from "@/components/cart/item";
import { fetchCartItems, getDataFromLocal } from "@/redux/cartSlice";
import OrderDetails from "@/components/cart/orderDetails";
import { IoMdArrowRoundBack } from "react-icons/io";
import ButtonX from "../button/buttonx";

const Cart = () => {
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const { data, isLoading, isError } = useSelector((state) => state.cart);
  const [addDetails, setAddDetails] = useState(false);

  // order details
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [shipping_charge, setShipping_charge] = useState(100);
  const [full_total, setFull_total] = useState(0);

  useEffect(() => {
    if (session?.user?.id) {
      setUserId(session.user.id);
      setName(session.user.name);
    }
    
  }, [session]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchCartItems({ user_id: userId }));
    }
    else {
      dispatch(getDataFromLocal())
    }
  }, [userId, dispatch]);

  useEffect(() => {
    setFull_total(data?.total_amount + shipping_charge);
    // console.log(data);
  }, [data]);

  return (
    <div className="max-w-screen flex justify-end transform-all transition-transform duration-300 relative z-50  ">
      <button
        className={`text-4xl absolute -top-5 z-10 ${open ? "text-white" : ""} `}
        onClick={() => setOpen(!open)}
      >
        <MdOutlineShoppingCart />
      </button>

      <div
        className={`fixed h-screen gradient2 text-white top-0 w-screen md:w-1/2 lg:w-1/3 ${
          open ? "right-[0%] " : "-right-[120%] "
        } transition-all ease-in-out duration-500 shadow-2xl py-10 px-10 md:px-10 `}
      >
        <div className="font-bold flex items-center text-xl h-[10%]">
          {addDetails ? (
            <button
              onClick={() => setAddDetails(false)}
              className="text-nowrap"
            >
              <IoMdArrowRoundBack /> Back{" "}
            </button>
          ) : (
            "Your Cart"
          )}
        </div>
        <hr />

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
            {data.items  &&
                data.items?.map((it) => (
                
                it && <Item it={it} user_id={userId} key={it?.id} />
              ))}
          </div>
        )}

        <hr />

        {/* Calculation */}
        <div className="h-[30%] pt-10 flex flex-col gap-2">
          <div className="flex justify-between text-lg">
            <h1 className="font-bold text-xl">Subtotal:</h1>{" "}
            <h1>{data?.total_amount} Taka</h1>
          </div>
          <div className="flex justify-between text-lg">
            <h1 className="font-bold text-xl">Shipping:</h1> <h1>100 Taka</h1>
          </div>
          <div className="flex justify-between text-lg mb-4">
            <h1 className="font-bold text-xl">Order Total:</h1>{" "}
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
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
