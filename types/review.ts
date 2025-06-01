import type { Document, Types } from "mongoose";
import { User } from "./user";

export interface ReviewDocument extends Document {
  user: Types.ObjectId | User;
  rating: number;
  comment: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
