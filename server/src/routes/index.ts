import express from "express";
import { validateToken } from "../middleware/auth";
import privateRoute from "./privateRoute";
import publicRoute from "./publicRoute";

const routes = express();

routes.use("/", publicRoute);
routes.use("*", validateToken);
routes.use("/user", privateRoute);

export default routes;
