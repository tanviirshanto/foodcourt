import mongoose from "mongoose";
import { Schema } from "mongoose";



const recommendedSchema = new Schema({
  shop_name: { type: String, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  images: { type: [String], required: true },
  estimated_time: { type: Number, required: true },
});




const Recommended =
  mongoose.models.recommendeds ||
  mongoose.model("recommendeds", recommendedSchema);

export default Recommended;
