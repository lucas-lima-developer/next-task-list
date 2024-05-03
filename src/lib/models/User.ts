import mongoose from "mongoose";
import UserInterface from "@/lib/interfaces/User";

const UserSchema = new mongoose.Schema<UserInterface>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  senha: {
    type: String,
    required: true,
  }
});

export default mongoose.models.User || mongoose.model<UserInterface>("User", UserSchema);
