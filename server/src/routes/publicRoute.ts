import bcrypt from "bcrypt";
import { Router } from "express";
import { User } from "../@types/user";
import UserController from "../controllers/userController";
import { prisma } from "../prisma";
import generateJWT from "../util/generateJWT";

const userController = new UserController();

const publicRoute = Router();

publicRoute.post("/signin", async (req, res) => {
  const [, hash] = req.headers.authorization?.split(" ") || [" ", " "];
  const [email, password] = Buffer.from(hash, "base64")?.toString()?.split(":");

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return res.status(400).send("Usuário não registrado!");
  } else {
    const verifyPassword = bcrypt.compareSync(password, user.password!);

    if (!verifyPassword) return res.status(400).send("Senha incorreta!");

    const token = generateJWT(user as User);

    res.status(201).send({
      user,
      token,
    });
  }
});

publicRoute.post("/signup", userController.registerUser);

export default publicRoute;
