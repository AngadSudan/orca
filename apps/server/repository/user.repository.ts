import prisma from "../utils/prisma";
import type { RegisterDTO, User } from "../utils/type";

class UserRepository {
  async getUser(email: string, includeSensitiveInfo: boolean = false) {
    return await prisma.user.findFirst({
      where: { OR: [{ email: email }] },
      select: {
        id: includeSensitiveInfo,
        name: true,
        username: true,
        email: true,
        description: true,
        profileBanner: true,
        verification: true,
        onBoarding: true,
        lastLoggedIn: true,
        password: includeSensitiveInfo,
        accessToken: includeSensitiveInfo,
      },
    });
  }

  async createUser(registerDetails: RegisterDTO) {
    return await prisma.user.create({
      data: {
        email: registerDetails.email,
        username: registerDetails.username,
        password: registerDetails.password,
        name: registerDetails.name,
      },
      select: {
        name: true,
        username: true,
        email: true,
        description: true,
        profileBanner: true,
        verification: true,
        onBoarding: true,
        lastLoggedIn: true,
      },
    });
  }

  async updateUser(
    email: string,
    updatedValue: Partial<User>,
    includeSensitiveInfo: boolean = false,
  ) {
    const dbUser = await this.getUser(email, true);

    if (!dbUser) {
      throw new Error("User not found");
    }

    // update any value other than below mentioned fields
    const value = Object.fromEntries(
      Object.entries(updatedValue).filter(
        ([key, v]) =>
          v !== undefined &&
          key !== "id" &&
          key !== "createdAt" &&
          key !== "updatedAt" &&
          key !== "organizations",
      ),
    );

    return await prisma.user.update({
      where: { id: dbUser.id },
      data: value,
      select: {
        id: includeSensitiveInfo,
        name: true,
        username: true,
        email: true,
        description: true,
        profileBanner: true,
        verification: true,
        onBoarding: true,
        lastLoggedIn: true,
        password: includeSensitiveInfo,
        accessToken: includeSensitiveInfo,
      },
    });
  }
}
export default new UserRepository();
