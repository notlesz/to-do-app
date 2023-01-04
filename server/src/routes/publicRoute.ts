import bcrypt from "bcrypt";
import { Router } from "express";
import jsonwebtoken from "jsonwebtoken";
import UserController from "../controllers/userController";
import { PRIVATE_KEY } from "../middleware/auth";
import { prisma } from "../prisma";

const userController = new UserController();

const publicRoute = Router();

publicRoute.post("/singin", async (req, res) => {
  const [, hash] = req.headers.authorization?.split(" ") || [" ", " "];
  const [email, password] = Buffer.from(hash, "base64")?.toString()?.split(":");

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) return res.status(400).send("Usuário não registrado!");

  const verifyPassword = bcrypt.compareSync(password, user.password!);

  if (!verifyPassword) return res.status(400).send("Senha incorreta!");

  const token = jsonwebtoken.sign(
    {
      user: JSON.stringify({
        name: user.name,
        email: user.email,
        id: user.id,
      }),
    },
    PRIVATE_KEY,
    { expiresIn: "12h" }
  );

  res.status(201).send(token);
});

publicRoute.post("/signup", userController.registerUser);

export default publicRoute;
