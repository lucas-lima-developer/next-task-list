import User from "@/models/User";
import dbConnect from "./dbConnect";
import { Schema } from "mongoose";

export interface UserDocument{
  _id: Schema.Types.ObjectId;
  email: string;
  senha: string;
}

export async function findUserByEmail(email: any) : Promise<UserDocument | null> {
	await dbConnect();

	const user = await User.findOne({ email }).lean();

	return user as UserDocument;
}

export async function createUser(user: { email: string, senha: string }) {
  await dbConnect();

  const userCreated = await User.create(user);

  return userCreated;
}