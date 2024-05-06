import User from "@/lib/models/User";
import UserInterface from "@/lib/interfaces/User";
import DatabaseService from "@/lib/services/DatabaseService";

/**
 * Classe responsável pelos serviços de usuário.
 *
 * @export
 * @class UserService
 */
export default class UserService {

  /**
   * Procura usuário pelo email dado.
   *
   * @static
   * @param {string} email - email do usuário.
   * @return {UserInterface} - usuário encontrado.
   * @memberof UserService
   */
  static async findByEmail(email: string): Promise<UserInterface> {
    await DatabaseService.connect();

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    return user;
  }

  /**
   * Cria usuário
   *
   * @static
   * @param {Object} user - usuário a ser criado.
   * @param {string} user.email - email do usuário.
   * @param {string} user.senha - senha do usuário.
   * @return {Promise<UserInterface>} - usuário criado. 
   * @memberof UserService
   */
  static async create(user: { email: string, senha: string }): Promise<UserInterface> {
    await DatabaseService.connect();

    const userCreated = await User.create(user);

    return userCreated;
  }
}