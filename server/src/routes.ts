import { Router } from "express";
import { Prisma } from "@prisma/client";
import { UserController } from "./controllers/user-controller";

export const routes = Router();

const userController = new UserController();

routes.get("/users/count", async (req, res) => {
  const count = await userController.countUsers();
  res.send(count);
});

routes.get("/user/:id", async (req, res) => {
  const { id } = req.params;

  const userData = await userController.getUser(id);

  res.send(userData);
});

routes.get("/user/:id/task", async (req, res) => {
  const { id } = req.params;
  const userTasks = await userController.getAllUserTasks(id);

  res.send(userTasks);
});

routes.post("/user", async (req, res) => {
  const { name, email, password, profilePicture } = req.body;

  try {
    const userCreated = await userController.createUser({
      name,
      email,
      password,
      profilePicture,
    });
    res.sendStatus(201).send(userCreated);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        res.sendStatus(404).send({
          message: "Email já existente.",
        });
      }
    }
  }
});

routes.patch("/user/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, password, profilePicture } = req.body;

  try {
    const updatedUser = await userController.updateUser(id, {
      name,
      email,
      password,
      profilePicture,
    });
    res.sendStatus(200).send(updatedUser);
  } catch (error) {
    res.sendStatus(400);
  }
});

routes.delete("/user/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await userController.deleteUser(id);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(404).send({
      message: "Falha ao deletar usuário",
    });
  }
});
