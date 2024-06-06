
import axios from 'axios';
import { useRouter } from "next/navigation";
import React from 'react'
import { toast, Toaster } from 'react-hot-toast';
import { GrLinkNext } from "react-icons/gr";

function ButtonX({
  addDetails,
  setAddDetails,
  name,
  address,
  email,
  contact,
  data,
  shipping_charge,
  full_total,
  user_id,
  
}) {
  const router = useRouter()

      const orderData = {
        order_date:new Date(),
        name,
        address,
        email,
        contact,
        items: data.items,
        shipping: "pending",
        shipping_charge,
        payment: "pending",
        full_total,
      };
    
    const postData = {
      user_id,orderData
    };
  

  const handleClick = async (e) => {
    e.preventDefault();
    if (!addDetails) {
      if (user_id) setAddDetails(true);
      else router.push("/register")
    } else {
      try {
        if (!name || !address || !email || !contact) {
          toast.error("Please provide correct details");
        } else {
          console.log(postData)
          const response = await axios.post("/api/order/placeorder", postData);
          console.log(response);
          toast.success("Order Placed Successfully")
          router.push(`/payment/${user_id}/${response.data.order._id}`)
        }
      } catch (error) {
        console.log(error.message);
        toast.error("Failed to place order")
      }
    }
  }
  
  return (
    <div
      className={`w-full py-4  bg-[#59c0e6] rounded-md text-xl font-semibold text-white flex justify-center items-center gap-1 group cursor-pointer `}
      onClick={handleClick}
    >
      <div className="group-hover:-translate-x-2 group-hover:transition-transform  ">
        {addDetails ? "Checkout" : "Add to Order"}
      </div>
      <span className="font-extrabold group-hover:translate-x-2 group-hover:transition-transform ">
        <GrLinkNext />
      </span>
      <Toaster />
    </div>
  );
}

export default ButtonX