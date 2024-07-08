import mongoose, { ConnectOptions, Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local",
  );
}

/**
 * Classe responsável por realizar serviços de conexão com banco de dados mongodb.
 *
 * @export
 * @class DatabaseService
 */
export default class DatabaseService {
  
  private static mongooseInstance: Mongoose | null = null;
  private static mongooseConnection: mongoose.Connection | null = null;
 
  /**
   * Função responsável por fazer a conexão do banco de dados.
   *
   * @static
   * @return {Promise<mongoose.Connection>} - conexão com o banco de dados.
   * @memberof DatabaseService
   */
  public static async connect(): Promise<mongoose.Connection> {
    if (DatabaseService.mongooseConnection) {
      return DatabaseService.mongooseConnection;
    }
    if (!DatabaseService.mongooseInstance) {
      const opts: ConnectOptions = {
        bufferCommands: false,
      };
      DatabaseService.mongooseInstance = await mongoose.connect(MONGODB_URI, opts);
    }
    try {
      DatabaseService.mongooseConnection = DatabaseService.mongooseInstance.connection;
    } catch (e) {
      throw e;
    }

    return DatabaseService.mongooseConnection;
  }
}
