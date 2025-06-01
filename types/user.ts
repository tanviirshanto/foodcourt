export interface User {
  _id: string; // ✅ always a string in the frontend
  name: string;
  email: string;
  password: string;
  imageUrl?: string;
  contact?: string;
  address?: string;
  isVerified?: boolean;
  role?: "admin" | "user";
  forgotPasswordToken?: string;
  forgotPasswordTokenExpiry?: string;
  verifyToken?: string;
  verifyTokenExpiry?: string;
}
