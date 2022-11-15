import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "User Test",
      email: "user.test@gmail.com",
      password: bcrypt.hashSync("123456", 8),
      profilePicture: "https://github.com/elton-souza.png",
    },
  });

  const task = await prisma.task.create({
    data: {
      title: "Tarefa 1",
      description: "Testando",
      runtime: 30000,
      ownerId: user.id,
      status: "A_fazer"
    },
  });
}

main();
