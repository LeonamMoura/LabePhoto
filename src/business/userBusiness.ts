import { UserDatabase } from "../data/userDatabase";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";



export class UserBusiness {

  async signUp(name: string, email: string, nickname: string, password: string) {

    function validateEmail(email: string) {
      const re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
      return re.test(String(email).toLowerCase());
    };

    if (!validateEmail(email)) {
      throw new Error("Insira um e-mail válido!");
    };

    if (!name || !email || !nickname || !password) {
      throw new Error("Preencha todos os campos!");
    };

    if (password.length < 6) {
      throw new Error("Senha deve possuír no mínimo 6 caracteres");
    };


    const idGenerator = new IdGenerator();
    const id = idGenerator.generateId();

    const hashManager = new HashManager();
    const hashedPassword = await hashManager.hash(password);

    const userDatabase = new UserDatabase();
    const result = await userDatabase.signUp(id, name, email, nickname, hashedPassword);

    return result;

  }


  async login(email: string, password: string): Promise<string> {

    if (!email || !password) {
      throw new Error("Preencha todos os campos!");
    };

    const userDatabase = new UserDatabase();
    const user = await userDatabase.getUserByEmail(email);

    const hashManager = new HashManager();
    const isPasswordCorrect = await hashManager.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new Error("Senha incorreta!");
    };

    const authenticator = new Authenticator();
    const token = authenticator.generateToken({ id: user.id });

    return token;
  }
}