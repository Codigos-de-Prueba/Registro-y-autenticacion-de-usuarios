import { Router } from "express";
import { login, register, getUser } from "../controllers/index.controller";
import { meansOfLogin, meansOfRegister } from "../middleware/meansOfValidation";

const router = Router();

router.post("/register", meansOfRegister, register);
router.post("/login", meansOfLogin, login);
router.get("/user", getUser);

export { router };
