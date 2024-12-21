import { Sequelize } from "sequelize";

class Database {
  public sequelize: Sequelize;

  private POSTGRES_DB = process.env.POSTGRES_DB as string;
  private POSTGRES_HOST = process.env.POSTGRES_HOST as string;
  private POSTGRES_PORT = parseInt(process.env.POSTGRES_PORT || "5432", 10);
  private POSTGRES_USER = process.env.POSTGRES_USER as string;
  private POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD as string;

  constructor() {
    this.sequelize = new Sequelize({
      database: this.POSTGRES_DB,
      host: this.POSTGRES_HOST,
      port: this.POSTGRES_PORT,
      username: this.POSTGRES_USER,
      password: this.POSTGRES_PASSWORD,
      dialect: "postgres",
      logging: false,
    });
  }

  public async connect(): Promise<void> {
    try {
      await this.sequelize.authenticate();
      console.log("Successfully connected to the database.");
      await this.sequelize.sync({ alter: true });
      console.log("Database synchronized successfully.");
    } catch (error) {
      console.error("Error connecting to the database:", error);
    }
  }

  public async close(): Promise<void> {
    try {
      await this.sequelize.close();
      console.log("Database connection closed.");
    } catch (error) {
      console.error("Error closing the database connection:", error);
    }
  }
}

const databaseInstance = new Database();

export const sequelize = databaseInstance.sequelize;
export default databaseInstance;
