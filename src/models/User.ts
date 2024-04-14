import mongoose from "mongoose";

export interface User extends mongoose.Document {
  email: string;
  senha: string;
}

const UserSchema = new mongoose.Schema<User>({
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

export default mongoose.models.User || mongoose.model<User>("User", UserSchema);
