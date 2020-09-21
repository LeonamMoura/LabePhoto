import { baseDatabase } from "./baseDatabase";

export class UserDatabase extends baseDatabase {
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
      .into(UserDatabase.TABLE_NAME)

  }

  async getUserByEmail(email: string): Promise<any> {
    const result = await this.getConnection()
      .select('*')
      .from(UserDatabase.TABLE_NAME)
      .where({ email })

    return result[0]
  }

}