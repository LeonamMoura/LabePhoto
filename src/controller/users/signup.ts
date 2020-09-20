import { Request, Response } from "express";
import { baseDatabase } from "../../data/baseDatabase";
import { userBusiness } from "../../business/userBusiness";

export const registerUser = async (req: Request, res: Response) => {
  try {

    const { name, email, nickname, password } = req.body;

    const newUser = new userBusiness();
    await newUser.signUp(name, email, nickname, password)

    res.status(200).send({
      message: 'Usuário cadastrado! Faça login para obter o token'
    });


  } catch (e) {
    res.status(400).send({
      message: e.message
    });
  };
  await baseDatabase.destroyConnection();
};