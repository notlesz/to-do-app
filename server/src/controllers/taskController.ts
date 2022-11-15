import { Task } from "../@types/task";
import { prisma } from "../prisma";

export default class TaskController {
  async updateTaskInformation(id: string, task: Task) {
    const updatedTask = await prisma.task.update({
      where: {
        id: Number(id),
      },
      data: {
        ...task,
      },
    });

    return updatedTask;
  }

  async deleteTask(id: string) {
    await prisma.task.delete({
      where: {
        id: Number(id),
      },
    });
  }
}
