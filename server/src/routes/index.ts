import express from "express";
import { validateToken } from "../middleware/auth";
import privateRoute from "./privateRoute";
import publicRoute from "./publicRoute";

const routes = express();

routes.use("/", publicRoute);
routes.use("/user", validateToken, privateRoute);

export default routes;
