import { Router } from "express";
import UserController from "../controllers/userController";

const userPrivateRoute = Router();

const userController = new UserController();

userPrivateRoute.get("/user", async (req, res) => {
  const { user } = req.headers;
  const currentUser = JSON.parse(user as string);
  const userData = await userController.getUser(currentUser.id);

  res.send(userData);
});!

userPrivateRoute.get("/user/task", async (req, res) => {
  const { user } = req.headers;
  const currentUser = JSON.parse(user as string);
  const userTasks = await userController.getAllUserTasks(currentUser.id);

  res.send(userTasks);
});

userPrivateRoute.patch("/user/update", async (req, res) => {
  const { user } = req.headers;
  const currentUser = JSON.parse(user as string);
  const { name, email, password, profilePicture } = req.body;

  try {
    const updatedUser = await userController.updateUser(currentUser.id, {
      name,
      email,
      password,
      profilePicture,
    });
    res.send(updatedUser);
  } catch (error) {
    res.status(400);
  }
});

userPrivateRoute.delete("/user/delete", async (req, res) => {
  const { user } = req.headers;
  const currentUser = JSON.parse(user as string);

  try {
    await userController.deleteUser(currentUser.id);
    res.status(200);
  } catch (error) {
    res.status(404).send("Falha ao deletar usuário");
  }
});


export default userPrivateRoute;