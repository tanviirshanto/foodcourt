import mongoose, { Schema, Document, Model } from "mongoose";
import { ICart as ICartBase, CartItem } from "@/types/cart"; // adjust path if needed

// Extend ICart from cart.ts to add mongoose-specific properties
interface ICart extends Omit<ICartBase, "_id" | "user_id">, Document {
  user_id: mongoose.Types.ObjectId;
}

// Define the schema using the imported CartItem type
const cartSchema: Schema<ICart> = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        id: { type: String, required: true },
        name: { type: String, required: true },
        category: { type: String, required: true },
        estimated_time: { type: Number, required: true },
        image: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    total_amount: {
      type: Number,
      required: true,
    },
    total_time: {
      type: Number,
      
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

// Pre-save hook to calculate totals
cartSchema.pre<ICart>("save", function (next) {
  this.total_amount = parseFloat(
    this.items.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2)
  );

  this.total_time = this.items.reduce(
    (total, item) => total + item.quantity * item.estimated_time,
    0
  );

  next();
});

// Create the model
const Cart: Model<ICart> = mongoose.models.carts || mongoose.model<ICart>("carts", cartSchema);

export default Cart;
