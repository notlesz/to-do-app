import { User } from "../../@types/user";
import { prisma } from "../../prisma";

export class UserController {
  async getUser(id: string) {
    const userData = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });

    return {
      ...userData,
    };
  }

  async getAllUserTasks(id: string) {
    const allUserTasks = await prisma.task.findMany({
      where: {
        ownerId: Number(id),
      },
    });

    return {
      tasks: allUserTasks,
    };
  }

  async countUsers() {
    const count = await prisma.user.count();
    return {
      count,
    };
  }

  async createUser(user: User) {
    const userCreated = await prisma.user.create({
      data: {
        ...user,
      },
    });
    return {
      ...userCreated,
    };
  }

  async updateUser(id: string, user: User) {
    const updatedUser = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        ...user,
      },
    });

    return {
      ...updatedUser,
    };
  }

  async deleteUser(id: string) {
    await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });
  }
}
