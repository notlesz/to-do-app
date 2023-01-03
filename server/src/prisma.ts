import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  log: ["query"],
});

prisma.$connect().then(() => console.log("Database connected"));
