import User from "@/models/User";
import dbConnect from "./dbConnect";

export async function findUserByEmail(email: any) {
	await dbConnect();

	const user = await User.findOne({ email }).lean();

	return user;
}

export async function createUser(user: { email: string, senha: string }) {
  await dbConnect();

  const userCreated = await User.create(user);

  return userCreated;
}