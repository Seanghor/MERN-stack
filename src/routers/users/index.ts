import { Router } from "express";
import userController from "./user.controller";

export default () => {
    const router = Router();
    router.post("/register", userController.register);

    return router;
}