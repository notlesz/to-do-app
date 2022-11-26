import { Task } from "../@types/task";
import { User } from "../@types/user";
import { prisma } from "../prisma";

export default class UserController {
  async getUser(id: number) {
    const userData = await prisma.user.findUnique({
      select: {
        id: true,
        name: true,
        email: true,
        profilePicture: true,
        createdAt: true,
        updatedAt: true,
      },
      where: {
        id,
      },
    });

    return userData;
  }

  async getAllUserTasks(id: number) {
    const allUserTasks = await prisma.task.findMany({
      where: {
        ownerId: id,
      },
    });

    return {
      tasks: allUserTasks,
    };
  }

  async createUser(user: User) {
    const userCreated = await prisma.user.create({
      data: {
        ...user,
      },
      select: {
        id: true,
        name: true,
        email: true,
        profilePicture: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return userCreated;
  }

  async createUserTask(id: number, task: Task) {
    const createdTask = prisma.task.create({
      data: {
        ...task,
        owner: {
          connect: {
            id,
          },
        },
      },
    });

    return createdTask;
  }

  async updateUser(id: number, user: User) {
    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        ...user,
      },
    });

    return updatedUser;
  }

  async deleteUser(id: number) {
    await prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
