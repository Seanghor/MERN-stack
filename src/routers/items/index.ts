import { Router } from "express";
import itemsControllers from "./items.controllers";

export default () => {
    const router :Router = Router();
    router.post("/items", itemsControllers.greeting);

    return router;
}