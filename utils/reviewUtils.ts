import { User } from "@/types";
import { Types } from "mongoose";

export const getUserName = (user: Types.ObjectId | User): string => {
  if (typeof user === "object" && "name" in user) {
    return user.name;
  }
  return "Unknown";
};
