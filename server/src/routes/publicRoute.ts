import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import { Router } from "express";
import jsonwebtoken from "jsonwebtoken";
import UserController from "../controllers/userController";
import { PRIVATE_KEY } from "../middleware/auth";
import { prisma } from "../prisma";
import { validatePassword } from "../util/validates";

const userController = new UserController();

const publicRoute = Router();

publicRoute.post("/login", async (req, res) => {
  const [, hash] = req.headers.authorization?.split(" ") || [" ", " "];
  const [email, password] = Buffer.from(hash, "base64")?.toString()?.split(":");

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) return res.status(401).send("E-mail ou senha incorreta!");

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
    { expiresIn: "6h" }
  );

  res.send(userToken);
});

publicRoute.post("/user/register", async (req, res) => {
  const { name, email, password, profilePicture } = req.body;

  try {
    const validatedPassword = validatePassword(password);

    if (!validatedPassword.isValid)
      return res.status(401).send(validatedPassword.message);

    const encryptedPassword = bcrypt.hashSync(password, 8);

    const userCreated = await userController.createUser({
      name,
      email,
      password: encryptedPassword,
      profilePicture,
    });

    const userToken = jsonwebtoken.sign(
      {
        user: JSON.stringify({
          name: userCreated?.name,
          email: userCreated?.email,
          id: userCreated?.id,
        }),
      },
      PRIVATE_KEY,
      { expiresIn: "24h" }
    );

    res.status(201).send({
      token: userToken,
      user: userCreated,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        res.status(404).send("Email já existente.");
      }
    }
  }
});

export default publicRoute;
