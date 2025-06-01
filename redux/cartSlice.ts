// cartSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { CartPostPayload, CartState, CartItem, CartRemovePayload } from "../types";

import {
  deleteCartItem,
  getCartItems,
  addToCart,
  removeCart,
  modifyCartItem,
} from "./cartApi";

const initialState: CartState = {
  data: {
    _id: undefined,
    user_id: "",
    items: [],
    total_amount: 0,
    total_time: 0,
    total_item: 0,
  },
  isLoading: false,
  isError: false,
  error: "",
};

const computeCartTotals = (items: CartItem[]) => {
  console.log("Computing cart totals for items:", items);
  const total_amount = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const total_time = items.reduce((sum, item) => sum + item.quantity * item.estimated_time, 0);
  const total_item = items.reduce((sum, item) => sum + item.quantity, 0);
  return { total_amount, total_time, total_item };
};

const syncLocalStorage = (items: CartItem[], user_id?: string) => {
  if (!user_id) {
    localStorage.setItem("foodclub", JSON.stringify(items));
  }
};

export const fetchCartItems = createAsyncThunk<CartState["data"], { user_id: string }>(
  "cartItems/fetchCartItems",
  async ({ user_id }) => {
    return await getCartItems({ user_id });
  }
);

export const createCartItem = createAsyncThunk<CartState["data"], CartPostPayload>(
  "cartItems/createCartItem",
  async (postData) => {
    console.log("Creating cart item with payload:", postData);
    return await addToCart(postData);
  }
);

export const editCartItem = createAsyncThunk<CartState["data"], CartPostPayload>(
  "cartItems/editCartItem",
  async (postData) => {
    return await modifyCartItem(postData);
  }
);

export const removeCartItem = createAsyncThunk<CartState["data"], CartRemovePayload>(
  "cart/removeCartItem",
  async (postData) => {
    return await deleteCartItem(postData);
  }
);

export const deleteCart = createAsyncThunk<CartState["data"], string>(
  "cart/deleteCart",
  async (user_id) => {
    return await removeCart(user_id);
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    getDataFromLocal: (state) => {
      try {
        const items: CartItem[] = JSON.parse(localStorage.getItem("foodclub") || "[]");
        const totals = computeCartTotals(items);
        state.data.items = items;
        state.data.total_amount = totals.total_amount;
        state.data.total_item = totals.total_item;
        state.data.total_time = totals.total_time || 0;
      } catch (e) {
        console.error("Failed to parse localStorage", e);
        state.data.items = [];
        state.data.total_amount = 0;
        state.data.total_item = 0;
        state.data.total_time = 0;
      }
    },

    createCartItemLocal: (state, action: PayloadAction<{ newItem: CartItem }>) => {
      const itemToAdd = action.payload.newItem;
      const existingItem = state.data.items.find((item) => item.id === itemToAdd.id);

      if (existingItem) {
        existingItem.quantity += itemToAdd.quantity;
      } else {
        state.data.items.push(itemToAdd);
      }

      const totals = computeCartTotals(state.data.items);
      state.data.total_amount = totals.total_amount;
      state.data.total_item = totals.total_item;
      state.data.total_time = totals.total_time;

      syncLocalStorage(state.data.items, state.data.user_id);
    },

    removeCartItemLocal: (state, action: PayloadAction<string>) => {
      state.data.items = state.data.items.filter((item) => item.id !== action.payload);

      const totals = computeCartTotals(state.data.items);
      state.data.total_amount = totals.total_amount;
      state.data.total_item = totals.total_item;
      state.data.total_time = totals.total_time;

      syncLocalStorage(state.data.items, state.data.user_id);
    },

    editCartItemLocal: (
      state,
      action: PayloadAction<{ id: string; newQty: number }>
    ) => {
      const { id, newQty } = action.payload;
      const item = state.data.items.find((item) => item.id === id);

      if (item) item.quantity = newQty;

      const totals = computeCartTotals(state.data.items);
      state.data.total_amount = totals.total_amount;
      state.data.total_item = totals.total_item;
      state.data.total_time = totals.total_time;

      syncLocalStorage(state.data.items, state.data.user_id);
    },

    deleteCartLocal: (state) => {
      state.data.items = [];
      state.data.total_amount = 0;
      state.data.total_time = 0;
      state.data.total_item = 0;
      syncLocalStorage([], state.data.user_id);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        const totals = computeCartTotals(state.data.items);
        state.data.total_amount = totals.total_amount;
        state.data.total_time = totals.total_time;
        state.data.total_item = totals.total_item;
        syncLocalStorage(state.data.items, state.data.user_id);
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message || "Failed to fetch cart items.";
        state.data = initialState.data;
        syncLocalStorage([], state.data.user_id);
      })

      .addCase(createCartItem.fulfilled, (state, action) => {
        console.log("createCartItem fulfilled payload:", action.payload);
        state.isLoading = false;
        if (action.payload) {
          state.data = action.payload;
        }
        const totals = computeCartTotals(state.data.items);
        state.data.total_amount = totals.total_amount;
        state.data.total_item = totals.total_item;
        state.data.total_time = totals.total_time;
        syncLocalStorage(state.data.items, state.data.user_id);
      })

      .addCase(createCartItem.rejected, (state, action) => {
        console.error("createCartItem rejected:", action.error.message, action.error.stack);
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message || "Failed to create cart item.";
      })

      .addCase(editCartItem.fulfilled, (state, action) => {
        console.log("editCartItem fulfilled payload:", action.payload);
        state.isLoading = false;
        state.data = action.payload;
        const totals = computeCartTotals(state.data.items);
        state.data.total_amount = totals.total_amount;
        state.data.total_item = totals.total_item;
        state.data.total_time = totals.total_time;
        syncLocalStorage(state.data.items, state.data.user_id);
      })
      .addCase(editCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message || "Failed to edit cart item.";
      })

      .addCase(removeCartItem.fulfilled, (state, action) => {
        console.log("removeCartItem fulfilled payload:", action.payload);
        state.isLoading = false;
        state.data = action.payload;
        const totals = computeCartTotals(state.data.items);
        state.data.total_amount = totals.total_amount;
        state.data.total_item = totals.total_item;
        state.data.total_time = totals.total_time;
        syncLocalStorage(state.data.items, state.data.user_id);
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message || "Failed to remove cart item.";
      })

      .addCase(deleteCart.fulfilled, (state) => {
        state.isLoading = false;
        state.data.items = [];
        state.data.total_amount = 0;
        state.data.total_time = 0;
        state.data.total_item = 0;
        syncLocalStorage([], state.data.user_id);
      })
      .addCase(deleteCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message || "Failed to delete cart.";
      });
  },
});

export const {
  createCartItemLocal,
  getDataFromLocal,
  removeCartItemLocal,
  editCartItemLocal,
  deleteCartLocal,
} = cartSlice.actions;

export default cartSlice.reducer;
