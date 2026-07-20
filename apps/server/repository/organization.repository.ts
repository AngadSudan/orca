import prisma from "../utils/prisma";

class OrgRepository {
  async createOrganization(userId: string, name: string) {
    return await prisma.organization.create({
      data: {
        name,
        creatorId: userId,
      },
      select: {
        name: true,
        orgPlan: true,
        creator: {
          select: {
            name: true,
            email: true,
          },
        },
        startedAt: true,
        planExpiration: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}

export default new OrgRepository();
