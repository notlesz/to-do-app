import { Request, Response, NextFunction } from "express";
import jsonwebtoken from "jsonwebtoken";

const PRIVATE_KEY = "1010FFFF";

function validateToken(req: Request, res: Response, next: NextFunction) {
  const [, token] = req?.headers?.authorization?.split(" ") || [" ", " "];

  if (!token) res.status(401).send("Acesso negado! Nenhum token fornecido.");

  const payload = jsonwebtoken.verify(token, PRIVATE_KEY);
  
  const userIdFromToken = typeof payload !== "string" && payload.user;

  if (!userIdFromToken) res.status(401).send("Acesso negado! Token inválido.");

  req.headers["user"] = userIdFromToken;

  return next();
}

export { validateToken, PRIVATE_KEY };