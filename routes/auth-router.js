import express from "express";

import authController from "../controllers/auth-controller.js";

const authRouter = express.Router();

authRouter.post("/signup", authController.signup);
authRouter.post("/signin", authController.signin);

export default authRouter;