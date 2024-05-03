import User from "@/lib/models/User";
import DatabaseService from "./DatabaseService";

export default class UserService {
  static async findByEmail(email: string) {
    await DatabaseService.connect();

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    return user;
  }

  static async create(user: { email: string, senha: string }) {
    await DatabaseService.connect();

    const userCreated = await User.create(user);

    return userCreated;
  }
}