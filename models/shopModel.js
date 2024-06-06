const mongoose = require("mongoose");
const { Schema } = mongoose;


const itemSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    images: { type: [String], required: true },
    estimated_time: { type: Number, required: true },
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  { _id: false }
); 

const shopSchema = new Schema({
  name: { type: String, required: true },
  image_url: { type: String, required: true },
  items: { type: [itemSchema], required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
  __v: { type: Number, required: true },
});

// Create and export the model
const Shop = mongoose.models.shops || mongoose.model("shops", shopSchema);

export default Shop;
