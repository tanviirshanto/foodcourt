import User from "@/models/userModel";
import { serializeUser } from "./serialize";

export async function getUser(id: string): Promise<any> {
  const user = await User.findById(id).lean();
  return user ? serializeUser(user) : null;
}
