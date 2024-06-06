import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  deleteCartItem,
  getCartItems,
  addToCart,
  removeCart,
  modifyCartItem,
} from "./cartApi";

const initialState = {
  data: {
    items: [],
    total_amount: 0,
    total_time: 0,
    total_item: 0,
  },
  isLoading: false,
  isError: false,
  error: "",
};

export const fetchCartItems = createAsyncThunk(
  "cartItems/fetchCartItems",
  async ({ user_id }) => {
    //  console.log(user_id);
    const cartItems = await getCartItems({ user_id });
    // console.log("API response:", cartItems);

    return cartItems.data;
  }
);

export const createCartItem = createAsyncThunk(
  "cartItems/createCartItem",
  async (postData) => {
    const cartItem = await addToCart(postData);
    //  console.log(postData);
    return cartItem;
  }
);

export const editCartItem = createAsyncThunk(
  "cartItems/editCartItem",
  async (postData) => {
    const editedItem = await modifyCartItem(postData);
    //  console.log(postData);
    return editedItem;
  }
);

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (postData) => {
    console.log(postData);
    const cart = await deleteCartItem(postData);
    return cart;
  }
);

export const deleteCart = createAsyncThunk(
  "cart/deleteCart",
  async (user_id) => {
    console.log(user_id);
    const cart = await removeCart(user_id);
    return cart;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    getDataFromLocal: (state, action) => {
      const items = JSON.parse(localStorage.getItem("foodclub"));
      state.data.items = items;
      state.data.total_amount = state?.data?.items?.reduce(
        (total, item) => total + item.quantity * item.price,
        0
      );
    },

    createCartItemLocal(state, action) {
      const itemToAdd = action?.payload?.newItem;
      console.log(action);
      if (state.data.items) {
        const existingItem =
          state.data.items.find((item) => item.id === itemToAdd?.id) || null;

        console.log(existingItem);

        if (existingItem) {
          existingItem.quantity = existingItem.quantity + itemToAdd?.quantity;
        } else state.data.items.push(action.payload.newItem);
      } else {
        if (state.data.items === null) {
          state.data.items = [];
        }
        state.data.items.push(action.payload.newItem);
      }
      state.data.total_amount = state?.data?.items?.reduce(
        (total, item) => total + item.quantity * item.price,
        0
      );
      console.log(state.data);

      localStorage.setItem("foodclub", JSON.stringify(state.data.items));
    },

    removeCartItemLocal: (state, action) => {
      const itemId = action.payload;
      console.log(action);
      const filteredItems = state.data.items.filter(
        (item) => item.id !== itemId
      );
      console.log(filteredItems);
      state.data.items = filteredItems;
      localStorage.setItem("foodclub", JSON.stringify(state.data.items));
      state.data.total_amount = state?.data?.items?.reduce(
        (total, item) => total + item.quantity * item.price,
        0
      );
    },

    editCartItemLocal: (state, action) => {
      console.log(action.payload);
      const itemId = action.payload.id;
      const itemqty = action.payload.newQty;
      const itemIndex = state.data.items.findIndex(
        (item) => item.id === itemId);
      state.data.items[itemIndex].quantity = itemqty
      state.data.total_amount = state?.data?.items?.reduce(
        (total, item) => total + item.quantity * item.price,
        0
      );
      localStorage.setItem("foodclub", JSON.stringify(state.data.items));
    },

    deleteCartLocal: (state, action) => {
      state.data.items = [];
      state.data.total_amount = 0;
      state.data.total_time = 0;
      state.data.total_item = 0;
      localStorage.setItem("foodclub", JSON.stringify(state.data.items));
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        // console.log(action)
        if (action.payload !== null) {
          state.data.items = action.payload.items;
          state.data.total_time = action.payload.total_time;
          state.data.total_amount = action.payload.total_amount;
          state.data.total_item = state.data.items.length;

          // state.data.total_time = state?.data?.items?.reduce(
          //   (total, item) => total + item.quantity * item.estimated_time,
          //   0
          // );
        }
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
        state.data = [];
      })

      .addCase(createCartItem.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })

      .addCase(createCartItem.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        console.log(action);

        const itemToAdd =
          action.payload && action.payload.items ? action.payload.items : [];
        // console.log(itemToAdd);

        //   console.log(itemToAdd);
        if (itemToAdd !== null && itemToAdd.length > 0) {
          if (!state.data) {
            state.data = { items: [] }; // Initialize data object with items array if it's null or undefined
          } else if (!state.data.items) {
            state.data.items = []; // Initialize items array if it's null or undefined
          }

          state.data.items = itemToAdd;
          state.data.total_amount = itemToAdd.reduce(
            (total, item) => total + item.quantity * item.price,
            0
          );
          state.data.total_time = itemToAdd.reduce(
            (total, item) => total + item.quantity * item.estimated_time,
            0
          );
          state.data.total_item = state.data.items.reduce(
            (total, item) => total + item.quantity,
            0
          );
        }
      })

      .addCase(createCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      })

      .addCase(editCartItem.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })

      .addCase(editCartItem.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        console.log(action);

        // const itemToAdd =
        //   action.payload && action.payload.items ? action.payload.items : [];
        state.data.items = action.payload.items;
        state.data.total_amount = action.payload.total_amount;
        state.data.total_time = action.payload.total_time;

        state.data.total_item = state.data.items.reduce(
          (total, item) => total + item.quantity,
          0
        );
      })

      .addCase(editCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      })

      //remove from cart
      .addCase(removeCartItem.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isError = false;
        state.isLoading = false;
        state.data.items = action.payload.data.items;

        // state.data.total_amount = state.data.items.reduce(
        //   (total, item) => total + item.quantity * item.price,
        //   0
        // );

        state.data.total_amount = action.payload.data.total_amount;

        // state.data.total_time = state.data.items.reduce(
        //   (total, item) => total + item.quantity * item.estimated_time,
        //   0
        // );

        state.data.total_time = action.payload.data.total_time;
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
        console.log(state.error);
      })

      //delete cart
      .addCase(deleteCart.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(deleteCart.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isError = false;
        state.isLoading = false;
        state.data.items = [];

        state.data.total_amount = 0;

        state.data.total_time = 0;
      })
      .addCase(deleteCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
        console.log(state.error);
      });
  },
});

export const {
  createCartItemLocal,
  getDataFromLocal,
  removeCartItemLocal,
  editCartItemLocal,
} = cartSlice.actions;
export default cartSlice.reducer;
