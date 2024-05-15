
import { Router } from "express";
import authController from "./auth.controller";
import isAuth from "../../middleware/auth";


export default () => {
    const router = Router();
    router.post("/refreshToken", isAuth, authController.refreshToken)
    router.get("/current-profile",isAuth, authController.getCurrentProfile)
    router.post("/login", authController.login);
  
    return router;
}