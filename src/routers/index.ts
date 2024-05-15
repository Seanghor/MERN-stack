import { Application, NextFunction, Router } from "express";
import tasks from './tasks/index'
import users from './users/index'
import auth from './auth/index'
import isAuth from "../middleware/auth";

export default (app: Application) => {
    app.use("/api/v1/tasks", isAuth, tasks())
    app.use("/api/v1/users", users())
    app.use("/api/v1/auth", auth())




    return app;
}