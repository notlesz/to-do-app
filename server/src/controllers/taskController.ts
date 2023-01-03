import { Request, Response } from "express";
import { Task } from "../@types/task";
import { prisma } from "../prisma";

export default class TaskController {
  async getAllTasks(req: Request, res: Response) {
    const { userId } = req.params;
    try {
      const allUserTasks = await prisma.task.findMany({
        where: {
          ownerId: userId,
        },
      });

      return res.status(200).send({
        tasks: allUserTasks,
      });
    } catch (error) {
      return res.status(404).send({
        message: "Falha ao encontrar tarefas do usuário",
      });
    }
  }

  async createTask(req: Request, res: Response) {
    const { userId } = req.params;
    const { title, description, runTime, status } = req.body;

    try {
      await prisma.task.create({
        data: {
          title,
          description,
          runtime: runTime || null,
          status,
          owner: {
            connect: {
              id: userId,
            },
          },
        },
      });

      return res.status(201).send({
        message: "Tarefa criada com sucesso!",
      });
    } catch (error) {
      return res.status(400).send({
        message: "Falha ao criar tarefa!",
      });
    }
  }

  async updateTask(req: Request, res: Response) {
    const { taskId } = req.params;

    const task = req.body as Task;

    try {
      const updatedTask = await prisma.task.update({
        where: {
          id: Number(taskId),
        },
        data: {
          ...task,
        },
      });
      return res.status(200).send(updatedTask);
    } catch (error) {
      res.status(401).send("Falha ao atualizar tarefa.");
    }
  }

  async deleteTask(req: Request, res: Response) {
    const { taskId } = req.params;

    try {
      await prisma.task.delete({
        where: {
          id: Number(taskId),
        },
      });
      res.status(201).send("Tarefa deletada com sucesso.");
    } catch (error) {
      res.status(401).send("Falha ao deletar a tarefa.");
    }
  }
}
