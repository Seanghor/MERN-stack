import { Request, Response, NextFunction } from "express";
import taskService from "./tasks.service";
import taskMappers from "./mappers/task.mappers";
import { CreateTaskDto } from "../../types/tasks/create-task-dto";
import CustomError from "../../handler/customError";
import { StatusEnum } from "../../types/tasks/task-enum";
import { UpdateTaskDto } from "../../types/tasks/update-task-dto";
import { PayloadDto } from "../../types/users/payload-user-dto";

async function create(req: Request | any, res: Response, next: NextFunction) {
    try {
        const payload = req.payload as PayloadDto;

        const taskDto = { ...{ user_id: payload.id }, ...req.body } as CreateTaskDto;
        console.log("taskDto >>>>>>>", taskDto);
        if (!taskDto.name) {
            throw new CustomError(400, "Name is required");
        }
        const task = await taskService.create(taskDto);
        const persistenceData = taskMappers.toPersistence(task)
        res.status(200).send({ message: "Task created successfully", data: persistenceData });
    } catch (error) {
        next(error);
    }
}


async function getAll(req: Request | any, res: Response, next: NextFunction) {
    try {
        var payload = req.payload as { id: string, username: string, iat: number, exp: number };
        const tasks = await taskService.getAll(payload.id);
        const persistenceData = tasks.map(task => taskMappers.toPersistence(task));
        res.status(200).send({ message: "Get all task is successfull", data: persistenceData });
    } catch (error) {
        next(error);
    }
}


async function getOne(req: Request | any, res: Response, next: NextFunction) {
    try {
        var userId = req?.payload?.id as string;
        const { id } = req.params;
        const task = await taskService.getOne(id);
        if (task.user_id !== userId) {
            throw new CustomError(400, "You are not authorized to get this task");
        }
        const persistenceData = taskMappers.toPersistence(task);
        res.status(200).send({ message: "Get one task is successfull", data: persistenceData });
    } catch (error) {
        next(error);
    }

}


async function update(req: Request | any, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        var userId = req?.payload?.id as string;
        const taskDto = req.body as UpdateTaskDto;
        if (taskDto.status && !Object.values(StatusEnum).includes(taskDto.status)) {
            throw new CustomError(400, "Status is invalid");
        }
        const task = await taskService.getOne(id);
        if (task.user_id !== userId) {
            throw new CustomError(400, "You are not authorized to update this task");
        }
        const taskUpdate = await taskService.update(id, taskDto);
        const persistenceData = taskUpdate ? taskMappers.toPersistence(taskUpdate) : null;
        res.status(200).send({ message: "Task updated successfully", data: persistenceData });
    } catch (error) {
        next(error);
    }
}


async function remove(req: Request | any, res: Response, next: NextFunction) {
    try {
        var userId = req?.payload?.id as string;
        const { id } = req.params;
        const task = await taskService.getOne(id);
        if (task.user_id !== userId) {
            throw new CustomError(400, "You are not authorized to delete this task");
        }
        await taskService.remove(id);
        res.status(200).send({ message: "Task deleted successfully" });
    } catch (error) {
        next(error);
    }
}


async function updateStatus(req: Request | any, res: Response, next: NextFunction) {
    try {
        var userId = req?.payload?.id as string;
        const { id } = req.params;
        const { status } = req.body as { status: StatusEnum };
        if (!Object.values(StatusEnum).includes(status)) {
            throw new CustomError(400, "Status is invalid");
        }
        const currentTask = await taskService.getOne(id);
        if (currentTask.user_id !== userId) {
            throw new CustomError(400, "You are not authorized to update this task");
        }
        const task = await taskService.updateStatus(id, status);
        const persistenceData = task ? taskMappers.toPersistence(task) : null;
        res.status(200).send({ message: "Task status updated successfully", data: persistenceData });
    } catch (error) {
        next(error);
    }
}


async function unCheckAll(req: Request | any, res: Response, next: NextFunction) {
    try {
        var userId = req?.payload?.id as string;
        await taskService.unCheckeAll(userId)
        res.status(200).send({ message: "All task unchecked successfully" });
    } catch (error) {
        next(error);
    }
}

export default {
    create,
    getAll,
    update,
    getOne,
    remove,
    updateStatus,
    unCheckAll
}