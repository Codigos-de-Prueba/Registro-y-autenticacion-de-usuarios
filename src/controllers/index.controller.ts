import { Request, Response } from "express";
import { Database } from "../types/database";
import db from "../db/database";
import bcrypt from "bcrypt";
import generateJWT from "../utils/generateJWT";
import jwt, { JwtPayload } from "jsonwebtoken";

const register = async (req: Request, res: Response) => {
  try {
    const data: Database = req.body;

    const hash = await bcrypt.hash(data.password, 10);

    db.push({ ...data, password: hash, rol: ["user"], id: db.length + 1 });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const user = db.find((user) => user.email === data.email);
    console.log(user);

    if (!user) {
      res.status(401).json({ message: "Usuario no registrado" });
      return;
    }

    const isValidPassword = bcrypt.compareSync(data.password, user.password);
    console.log(isValidPassword);

    if (!isValidPassword) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    const token = await generateJWT(user.id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const token: string = req.cookies.token;

    if (!token) {
      res.status(401).json({ message: "acceso denegado" });
      return;
    }

    const decoded = jwt.verify(token, "shhh") as JwtPayload;

    const user = db.find((user) => user.id === Number(decoded.userId));

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error en getUser:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
export { register, login, getUser };
