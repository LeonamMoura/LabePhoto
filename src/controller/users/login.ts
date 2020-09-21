import { Request, Response } from "express";
import { baseDatabase } from "../../data/baseDatabase";
import { UserBusiness } from "../../business/userBusiness";


export const loginUser = async (req: Request, res: Response) => {

  try {

    const { email, password } = req.body;

    const userBusiness = new UserBusiness();
    const result = await userBusiness.login(email, password)


    res.status(200).send({
      token: result
    });

  } catch (error) {
    res.status(400).send({
      message: error.message
    })
  }
  await baseDatabase.destroyConnection();
}