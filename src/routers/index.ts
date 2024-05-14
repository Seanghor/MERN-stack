import { Application, NextFunction, Router } from "express";
import items from './items/index'
export default (app: Application) => {
    app.use("/api/v1/items", items());



    return app;
}