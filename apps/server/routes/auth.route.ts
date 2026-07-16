import { Router, type Request, type Response } from "express";
import apiResponse from "../utils/apiResponse";
import authController from "../controllers/auth.controller";
const authRouter = Router();

authRouter.post("/register", async (req: Request, res: Response) => {
  try {
    const data = await authController.registerUser({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    });
    return res.json(apiResponse(200, "user registered", data));
  } catch (error: any) {
    console.log(error);
    return res.json(apiResponse(500, error.message, null));
  }
});

authRouter.post("/login", async (req: Request, res: Response) => {
  try {
    const data = await authController.loginUser({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    });
    return res.json(apiResponse(200, "user loggedIn", data));
  } catch (error: any) {
    console.log(error);
    return res.json(apiResponse(500, error.message, null));
  }
});
export default authRouter;
