import orgRepository from "../repository/organization.repository";
import userRepository from "../repository/user.repository";
import MailService from "../service/Mail.service";
import { generateFreshTokens } from "../utils/jwt";
import { generateOTP, verifyOTP } from "../utils/otp";
import { comparePassword, hashPassword } from "../utils/password";
import type { LoginDTO, RegisterDTO } from "../utils/type";
import { VerificationStatus, OnBoardingStatus } from "../utils/type";

class AuthController {
  async registerUser(registerDetails: RegisterDTO) {
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
    const dbUser = await userRepository.getUser(loginDetails.email, true);
    if (!dbUser) throw new Error("User not found!");

    await comparePassword(loginDetails.password, dbUser.password);

    const token = generateFreshTokens({ email: dbUser.email });
    const updatedUser = await userRepository.updateUser(dbUser.email, {
      accessToken: token.accessToken,
      lastLoggedIn: new Date(),
    });

    return { token: token.accessToken, user: updatedUser };
  }
  async startVerification(email: string) {
    const dbUser = await userRepository.getUser(email);
    if (!dbUser) throw new Error("no user with this email found!");

    const otp = await generateOTP(dbUser.email);
    const mailSent = await MailService.sendVerificationMail(
      dbUser.email,
      dbUser.name,
      otp,
    );
    return { status: mailSent };
  }
  async completeVerification(email: string, otp: string) {
    const dbUser = await userRepository.getUser(email);
    if (!dbUser) throw new Error("no user with this email found!");

    const isCorrect = await verifyOTP(dbUser.email, otp);
    if (!isCorrect) {
      throw new Error("Incorrect OTP!");
    }

    return await userRepository.updateUser(dbUser.email, {
      verification: VerificationStatus.UN_VERIFIED,
    });
  }
  async completeOnboarding(name: string, email: string) {
    const dbUser = await userRepository.getUser(email, true);

    if (!dbUser) throw new Error("no such user found");

    const data = await orgRepository.createOrganization(dbUser.id, name);

    if (!data) throw new Error("failed to create organization");

    await userRepository.updateUser(email, {
      onBoarding: OnBoardingStatus.COMPLETED,
    });

    return data;
  }
}
export default new AuthController();
