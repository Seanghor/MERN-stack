import { Router } from "express";
import tasksControllers from "./tasks.controller";

export default () => {
    const router = Router();
    router.post("/", tasksControllers.create);
    router.get("/", tasksControllers.getAll);
    router.put("/:id", tasksControllers.update);
    router.get("/:id", tasksControllers.getOne);
    router.delete("/:id", tasksControllers.remove);
    router.put("/:id/status", tasksControllers.updateStatus);
    router.put("/reset/uncheck-all", tasksControllers.unCheckAll);
    return router;
}