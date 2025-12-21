import mongoose from "mongoose";
import { connect } from "@/dbConfig/dbConfig"; 
import User from "@/models/userModel"; 
import Shop from "@/models/shopModel";
import Recommended from "@/models/recommendedModel";
import Review from "@/models/reviewModel";


console.log(mongoose.modelNames());

export async function getHomeData() {
  await connect();

  console.log(mongoose.modelNames());
  
  let shops = [];
  let recommendedItems = [];
  let reviews = [];

 try {
    shops = await Shop.find().lean();
    recommendedItems = await Recommended.find().lean();
    reviews = await Review.find().populate("user", "name email role").lean();
    console.log("Reviews fetched:", reviews);
  } catch (error) {
    console.error("Database query error:", error);
  }

  return {
    shops,
    recommendedItems: recommendedItems.map((item) => ({
      ...item,
      _id: item._id.toString(),
    })),
    reviews,
  };
}
