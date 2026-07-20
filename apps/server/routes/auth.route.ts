import { Router, type Request, type Response } from "express";
import apiResponse from "../utils/apiResponse";
import authController from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import isUserInputValid from "../utils/validator";
const authRouter = Router();

authRouter.post("/register", async (req: Request, res: Response) => {
  try {
    if (req.body && !isUserInputValid(req.body)) {
      throw new Error("one/more input fields are wrong");
    }
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
    if (req.body && !isUserInputValid(req.body)) {
      throw new Error("one/more input fields are wrong");
    }

    const data = await authController.loginUser({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    });
    res.appendHeader(
      "Set-Cookie",
      `token=${data.token}; HttpOnly; Secure=${process.env.NODE_ENV === "production"}; Path=/; Max-Age=7200`,
    );
    return res.json(apiResponse(200, "user loggedIn", data));
  } catch (error: any) {
    console.log(error);
    return res.json(apiResponse(500, error.message, null));
  }
});

authRouter.post(
  "/request-verification",
  async (req: Request, res: Response) => {
    try {
      if (req.body && !isUserInputValid(req.body)) {
        throw new Error("one/more input fields are wrong");
      }

      const data = await authController.startVerification(req.body.email);

      if (!data.status) {
        throw new Error("failed to start verification");
      }
      return res.status(204).json({ message: "verification started" });
    } catch (error: any) {
      console.log(error);
      return res.json(apiResponse(500, error.message, null));
    }
  },
);
authRouter.post("/verify-user", async (req: Request, res: Response) => {
  try {
    if (req.body && !isUserInputValid(req.body)) {
      throw new Error("one/more input fields are wrong");
    }

    const data = await authController.completeVerification(
      req.body.email,
      req.body.otp,
    );

    return res.status(204).json({ message: "verification completed" });
  } catch (error: any) {
    console.log(error);
    return res.json(apiResponse(500, error.message, null));
  }
});
authRouter.post(
  "/complete-onboarding",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      if (req.body && !isUserInputValid(req.body)) {
        throw new Error("one/more input fields are wrong");
      }

      const data = await authController.completeOnboarding(
        req.body.name,
        req.user.email,
      );

      return res.status(201).json({ message: data });
    } catch (error: any) {
      console.log(error);
      return res.json(apiResponse(500, error.message, null));
    }
  },
);
export default authRouter;
