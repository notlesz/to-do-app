import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import { PRIVATE_KEY } from "../middleware/auth";
import { prisma } from "../prisma";
import { validatePassword } from "../util/validates";

export default class UserController {
  async registerUser(req: Request, res: Response) {
    const { name, email, password, profilePicture } = req.body;

    try {
      const validatedPassword = validatePassword(password);

      if (!validatedPassword.isValid)
        return res.status(401).send(validatedPassword.message);

      const encryptedPassword = bcrypt.hashSync(password, 8);

      const userCreated = await prisma.user.create({
        data: {
          name,
          email,
          password: encryptedPassword,
          profilePicture,
        },
        select: {
          id: true,
          name: true,
          email: true,
          profilePicture: true,
          createdAt: true,
          updatedAt: true,
        },
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
  }

  async getUser(req: Request, res: Response) {
    const { userId } = req.params;

    try {
      const userData = await prisma.user.findUnique({
        select: {
          id: true,
          name: true,
          email: true,
          profilePicture: true,
          createdAt: true,
          updatedAt: true,
        },
        where: {
          id: userId,
        },
      });

      return res.status(200).send(userData);
    } catch (error) {
      return res.status(404).send({
        message: "Falha ao encontrar usuário",
      });
    }
  }

  async updateUser(req: Request, res: Response) {
    const { userId } = req.params;
    const { name, email, password, profilePicture } = req.body;

    try {
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          name,
          email,
          password,
          profilePicture,
        },
      });

      return res.status(200).send({
        message: "Usuário atualizado com sucesso!",
      });
    } catch (error) {
      return res.status(400).send({
        message: "Falha ao atualizar usuário!",
      });
    }
  }

  async deleteUser(req: Request, res: Response) {
    const { userId } = req.params;
    try {
      await prisma.user.delete({
        where: {
          id: userId,
        },
      });
      return res.status(200).send({
        message: "Usuário removido com sucesso!",
      });
    } catch (error) {
      return res.status(400).send({
        message: "Falha ao remover usuário",
      });
    }
  }
}
