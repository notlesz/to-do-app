import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import { Router } from "express";
import jsonwebtoken from "jsonwebtoken";
import UserController from "../controllers/userController";
import { PRIVATE_KEY } from "../middleware/auth";
import { prisma } from "../prisma";

const userController = new UserController();

const publicRoute = Router();

publicRoute.post("/login", async (req, res) => {
  const [, hash] = req.headers.authorization?.split(" ") || [" ", " "];
  const [email, password] = Buffer.from(hash, "base64")?.toString()?.split(":");

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    const verifyPassword = bcrypt.compareSync(password, user?.password!);

    if (!verifyPassword)
      return res.status(401).send("E-mail ou senha incorreta!");

    const userToken = jsonwebtoken.sign(
      {
        user: JSON.stringify({
          name: user?.name,
          email: user?.email,
          id: user?.id,
        }),
      },
      PRIVATE_KEY,
      { expiresIn: "24h" }
    );

    res.send(userToken);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "PS2002") {
        res.status(401).send("E-mail ou senha incorreta!");
      }
    }
  }
});

publicRoute.post("/user/register", async (req, res) => {
  const { name, email, password, profilePicture } = req.body;

  if (password.length < 6) return res.status(401).send("Senha inválida");

  const encryptedPassword = bcrypt.hashSync(password, 8);

  try {
    const userCreated = await userController.createUser({
      name,
      email,
      password: encryptedPassword,
      profilePicture,
    });

    res.status(201).send(userCreated);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        res.status(404).send("Email já existente.");
      }
    }
  }
});

export default publicRoute;
