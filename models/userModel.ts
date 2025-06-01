import mongoose, { Schema, Document, Model, Types } from "mongoose";
import { User } from "@/types/user";

export interface UserDocument extends Omit<User, "_id">, Document {
  _id: Types.ObjectId;
}

const userSchema = new Schema<UserDocument>({
  name: { type: String, required: [true, "Please provide a username"] },
  email: { type: String, required: [true, "Please provide an email"], unique: true },
  password: { type: String, required: [true, "Please provide a password"] },
  imageUrl: String,
  contact: String,
  address: String,
  isVerified: { type: Boolean, default: false },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const UserModel: Model<UserDocument> =
  mongoose.models.User || mongoose.model<UserDocument>("User", userSchema);

export default UserModel;
