import mongoose from "mongoose";

export interface Users extends mongoose.Document {
  email: string,
  senha: string,
};

const UserSchema = new mongoose.Schema<Users>({
  email: {
    type: String,
    required: [true, "É necessário informar email."]
  },
  senha: {
    type: String,
    required: [true, "É necessário informar a senha."]
  }
});

export default mongoose.models.User || mongoose.model<Users>("User", UserSchema)