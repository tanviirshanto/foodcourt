export interface CartItem {
    id: string;
    name: string;
    category: string;
    estimated_time: number;
    image: string;
    quantity: number;
    price: number;
  }
  
  export interface Cart {
    _id?: string;
    user_id: string;
    items: CartItem[];
    total_amount: number;
    total_time: number;
  }
  
  export interface CartPostPayload {
    user_id: string | null;
    newItem: CartItem;
  }

  export interface CartRemovePayload {
    user_id: string;
    item_id: string;
  }

  export interface CartState {
    data: Cart & { total_item: number }; // total_item can be derived from items length or quantities
    isLoading: boolean;
    isError: boolean;
    error: string;
  }