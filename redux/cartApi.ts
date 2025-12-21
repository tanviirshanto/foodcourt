import axios from "axios";
import { CartPostPayload } from "../types";

export const getCartItems = async ({ user_id }: { user_id: string }) => {
  const response = await axios.get(`/api/cart/getcart/${user_id}`);
  if (response.data.success) {
    return response.data.data; // unwraping cart object
  }
  throw new Error(response.data.message || "Failed to fetch cart");
};

export const addToCart = async (postData: CartPostPayload) => {
  try {
    const res = await axios.post("/api/cart/additemtocart", postData);

    // Making sure to return the data
    return res.data;
  } catch (error: any) {
    console.error("addToCart error:", error.response?.data || error.message);

    // Throwing meaningful error for rejection
    throw new Error(error.response?.data?.error || "Failed to add to cart");
  }
};

export const modifyCartItem = async (postData: any) => {
  try{
    const res = await axios.put("/api/cart/editcartitem", postData);
    return res.data;
  }
  catch (error: any) {
    console.error("modifyCartItem error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.error || "Failed to modify cart item");
  }
  
};

export const deleteCartItem = async (postData: any) => {
  const response = await axios.put("/api/cart/removecartitem", postData);
  if (response.data.success) {
    return response.data.data;
  }
  throw new Error(response.data.message || "Failed to delete cart item");
};

export const removeCart = async (user_id: string) => {
  const response = await axios.delete(`/api/cart/deletecart?userid=${user_id}`);
  if (response.data.success) {
    return response.data.data || {}; // empty object if nothing returned
  }
  throw new Error(response.data.message || "Failed to delete cart");
};
