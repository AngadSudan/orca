import userRepository from "../repository/user.repository";
import { generateFreshTokens } from "../utils/jwt";
import { comparePassword, hashPassword } from "../utils/password";
import type { LoginDTO, RegisterDTO } from "../utils/type";

class AuthController {
  isUserInputValid(
    userInput: Record<string, any>,
    optionalFields: string[] = [],
  ): boolean {
    for (const key of Object.keys(userInput)) {
      if (optionalFields.includes(key)) continue;

      const value = userInput[key];
      if (value === null || value === undefined) return false;
      if (typeof value === "string" && value.trim().length === 0) return false;
    }

    return true;
  }
  async registerUser(registerDetails: RegisterDTO) {
    if (!this.isUserInputValid(registerDetails)) {
      throw new Error("Missing user details");
    }

    const dbUser = await userRepository.getUser(registerDetails.email);
    if (dbUser) throw new Error("Email already exists! Kindly Log in");

    const hashedPassword = await hashPassword(registerDetails.password);
    const user = {
      ...registerDetails,
      password: hashedPassword,
    };

    return await userRepository.createUser(user);
  }
  async loginUser(loginDetails: LoginDTO) {
    if (!this.isUserInputValid(loginDetails)) {
      throw new Error("Missing user details");
    }

    const dbUser = await userRepository.getUser(loginDetails.email, true);
    if (!dbUser) throw new Error("User not found!");

    await comparePassword(loginDetails.password, dbUser.password);
    const token = generateFreshTokens({ id: dbUser.id });
    const updatedUser = await userRepository.updateUser(dbUser.email, {
      accessToken: token.accessToken,
      refreshToken: token.refreshToken,
      lastLoggedIn: new Date(),
    });

    return { token: token.accessToken, user: updatedUser };
  }
}
export default new AuthController();
