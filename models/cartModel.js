import mongoose from "mongoose";


// Define schema for carts
const cartSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the Customer model
      required: true,
    },

    items: [
      {
        id: String,
        name: String,
        category: String,
        estimated_time: Number,
        image: String,
        quantity: Number,
        price: Number,
        image: String,
      },
    ],
    total_amount: {
      type: Number,
      required: true,
    },
    total_time: {
      type: Number,
      
    },
  } 
);

// Define a virtual property to compute the subtotal
// cartSchema.virtual("items.subTotal").get(function () {
//   return this.items.reduce(
//     (total, item) => total + item.quantity * item.price,
//     0
//   ).toFixed(2);
// });

// cartSchema.virtual("items.totalTime").get(function () {
//   return this.items
//     .reduce((total, item) => total + item.quantity * item.estimated_time, 0)
//     .toFixed(2);
// });

// Ensure the virtual property is included when converting the document to JSON
cartSchema.set("toJSON", { virtuals: true });

cartSchema.pre("save", function (next) {
  // Calculate total amount based on the sum of subtotals of all items
  const totalAmount = this.items
    .reduce((total, item) => total + item.quantity * item.price, 0)
    .toFixed(2);

  // Assign the calculated total amount to the total_amount field
  this.total_amount = totalAmount;

  // Calculate total time based on the sum of estimated times of all items
  const totalTime = this.items.reduce(
    (total, item) => total + item.quantity * item.estimated_time,
    0
  );

  // Assign the calculated total time to the total_time field
  this.total_time = totalTime;

  // Move to the next middleware or save the document
  next();
});






// Create the cart model
const Cart = mongoose.models.carts || mongoose.model("carts", cartSchema);

export default Cart;
