import { Sequelize } from 'sequelize';

class Database {
    public sequelize: Sequelize | undefined;

    private POSTGRES_DB = process.env.POSTGRES_DB as string;
    private POSTGRES_HOST = process.env.POSTGRES_HOST as string;
    private POSTGRES_PORT = process.env.POSTGRES_PORT as unknown as number;
    private POSTGRES_USER = process.env.POSTGRES_USER as string;
    private POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD as string;

    constructor() {
        this.connectToDB();
    }

    private async connectToDB() {
        try {
            this.sequelize = new Sequelize({
                database: this.POSTGRES_DB,
                host: this.POSTGRES_HOST,
                port: this.POSTGRES_PORT,
                username: this.POSTGRES_USER,
                password: this.POSTGRES_PASSWORD,
                dialect: "postgres",
            });
            await this.sequelize.authenticate();
                console.log("Successfully connected to DB");

            await this.sequelize.sync();
        } catch (error)
        {
            console.error("An error occurred when connecting to the DB:\n", error)
        }
    }
}

export default Database;