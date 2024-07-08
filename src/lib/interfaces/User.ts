import mongoose from "mongoose";

export default interface UserInterface extends mongoose.Document {
  _id: mongoose.Types.ObjectId,
  email: string;
  senha: string;
}