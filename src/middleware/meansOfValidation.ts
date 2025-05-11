import type { Request, Response, NextFunction } from "express";
import { usuarioSchema, usuarioSchemaLogin } from "../validations/bodyValidation";
import errorProcessor from "../utils/errorProcessor";

const meansOfRegister = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;

    const isValid = usuarioSchema.safeParse(data);

    if (!isValid.success) {
      console.log(isValid.error.format());

      const msg = errorProcessor(isValid.error.format());
      res.status(400).json(msg);

      return;
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

const meansOfLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;

    const isValid = usuarioSchemaLogin.safeParse(data);

    if (!isValid.success) {
      console.log(isValid.error.format());

      const msg = errorProcessor(isValid.error.format());
      res.status(400).json(msg);

      return;
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export { meansOfRegister, meansOfLogin };
