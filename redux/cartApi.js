import axios from "axios";

export const getCartItems = async ({ user_id }) => {
  // console.log(user_id)
  const response = await axios.get(`/api/cart/getcart/${user_id}`);

  return response;
};

export const addToCart = async (postData) => {
  //  console.log(postData)
  const response = await axios.post("/api/cart/additemtocart", postData);
   console.log(response)

  return response.data;
};

export const modifyCartItem = async (postData) => {
  //  console.log(postData)
  const response = await axios.put("/api/cart/editcartitem", postData);
  console.log(response);

  return response.data;
};

export const deleteCartItem = async (postData) => {
  let response = await axios.put(
    `/api/cart/removecartitem`,postData
  );
  console.log(response.data);
  response = await response.data;
  return response;
};


export const removeCart = async (user_id) => {
  let response = await axios.delete(
    `/api/cart/deletecart?userid=${user_id}`
  );
  console.log(response);
  response = await response.data;
  return response;
};