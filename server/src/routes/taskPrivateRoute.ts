import { Router } from "express";
import { Task } from "../@types/task";
import TaskController from "../controllers/taskController";

const taskPrivateRoute = Router();
const taskController = new TaskController();

taskPrivateRoute.patch("/task/:id", async (req, res) => {
  const { id } = req.params;
  const infoTask = req.body as Task;

  try {
    const updatedTask = await taskController.updateTaskInformation(id, infoTask);
    res.status(201).send(updatedTask);
  } catch (error) {
    console.log(error)
    res.status(401).send("Falha ao atualizar tarefa.");
  }
});

taskPrivateRoute.delete("/task/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await taskController.deleteTask(id);
    res.status(201).send("Tarefa deletada com sucesso.",);
  } catch (error) {
    res.status(401).send("Falha ao deletar a tarefa.");
  }
});

export default taskPrivateRoute;
