import knex from 'knex';
import Knex from 'knex';

export abstract class baseDatabase {
  private static connection: Knex | null = null;
  protected getConnection(): Knex {
    if (baseDatabase.connection === null) {
      baseDatabase.connection = knex({
        client: "mysql",
        connection: {
          host: process.env.DB_HOST,
          port: 3306,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME
        }
      })
    }
    return baseDatabase.connection;
  }
  public static async destroyConnection(): Promise<void> {
    if (baseDatabase.connection) {
      await baseDatabase.connection.destroy();
      baseDatabase.connection = null;
    }
  }
}