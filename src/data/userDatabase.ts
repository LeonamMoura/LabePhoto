import { baseDatabase } from "./baseDatabase";

export class userDatabase extends baseDatabase {
  private static TABLE_NAME: string = 'Users_LabePhoto';

  async signUp(
    id: string,
    name: string,
    email: string,
    nickname: string,
    password: string
  ): Promise<void> {

    await this.getConnection()
      .insert({ id, name, email, nickname, password })
      .into(userDatabase.TABLE_NAME)

  }

  async getUserByEmail(email: string): Promise<any> {
    const result = await this.getConnection()
      .select('*')
      .from(userDatabase.TABLE_NAME)
      .where({ email })

    return result[0]
  }

}