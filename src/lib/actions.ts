'use server'

import User from "@/models/User"
import dbConnect from "./dbConnect"

export async function createUser() {
	await dbConnect();

	const user = await User.create({
		email: 'lucas',
		senha: '1234'
	});

	console.log(user);

	return user
}