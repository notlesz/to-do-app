import { Router } from "express";
import TaskController from "../controllers/taskController";
import UserController from "../controllers/userController";

const privateRoute = Router();

const userController = new UserController();
const taskController = new TaskController();

// User
privateRoute.get("/:userId", userController.getUser);
privateRoute.patch("/:userId", userController.updateUser);
privateRoute.delete("/:userId", userController.deleteUser);

// User Task
privateRoute.get("/:userId/tasks", taskController.getAllTasks);
privateRoute.post("/:userId/task", taskController.createTask);
privateRoute.patch("/task/:taskId", taskController.updateTask);
privateRoute.delete("/task/:taskId", taskController.deleteTask);

export default privateRoute;
