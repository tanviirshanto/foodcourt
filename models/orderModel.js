import mongoose from "mongoose";



// Define schema for Orders
const orderSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the Customer model
    required: true,
  },

  orders: [
    {
      order_date: {
        type: Date,
      },
      name: {
        type:String
      },
      address: {
        type: String,
        required: [true, "Please provide your order address"],
      },
      email: String,
      contact: {
        type: String,
        required: [true, "Please provide your contact number"],
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

      shipping: {
        type: String,
        enum: ["pending", "delivered",  "cancelled"], // Example status options
      },
      shipping_charge:Number,
      payment: {
        type: String,
        enum: ["pending", "paid", "cash on delivery"], // Example status options
      },
      full_total: {
        type: Number,
        required: true,
      },
      total_time: {
        type: Number,
      },


    },
  ],
});



// Create the Order model
const Order = mongoose.models.orders || mongoose.model("orders", orderSchema);

export default Order;
