import { Router } from "express";
import LoginController from "../controllers/LoginController";

const loginRouter = Router();

const loginController = new LoginController();
loginRouter.post("/", loginController.create)
loginRouter.get("/validate", loginController.validate)
loginRouter.get("/menu", loginController.menu)

export default loginRouter;
