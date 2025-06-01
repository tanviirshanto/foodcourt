import mongoose from "mongoose";

export async function connect() {
  try {
    if (mongoose.connection.readyState >= 1) return;

    await mongoose.connect(process.env.MONGO_URI!); // ✅ Await here

    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
      process.exit(1);
    });

  } catch (error) {
    console.error("Something went wrong with MongoDB connection");
    console.error(error);
    throw error;
  }
}
