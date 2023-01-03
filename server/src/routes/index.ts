import express from "express";
import { validateToken } from "../middleware/auth";
import userPrivateRoute from "./userPrivateRoute";
import publicRoute from "./publicRoute";
import taskPrivateRoute from "./taskPrivateRoute";

const routes = express();

routes.use(publicRoute);
routes.use('*', validateToken);
routes.use(taskPrivateRoute)
routes.use(userPrivateRoute);

export default routes;
