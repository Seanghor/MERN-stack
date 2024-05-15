
import { CreateTaskDto } from "../../types/tasks/create-task-dto";
import Tasks from "../../database/models/tasks";
import CustomError from "../../handler/customError";
import { UpdateTaskDto } from "../../types/tasks/update-task-dto";
import { StatusEnum } from "../../types/tasks/task-enum";

const isThatTaskExist = async (name: string, user_id: string) => {
    const allTasks = await Tasks.find({ user_id });
    console.log("allTasks >>>>>>>", allTasks);

    if (allTasks.length === 0) {
        console.log("No task yet ...");
        return false;
    }
    const isExist = allTasks?.find(task => task.name.toLowerCase() === name.toLowerCase());
    if (isExist) {
        return true;
    }
    return false;
};


/**
* @Description this controller is use to create task
* @Example /tasks
*/
async function create(taskDto: CreateTaskDto) {
    const isTastExist = await isThatTaskExist(taskDto.name, taskDto.user_id)
    if (isTastExist) {
        throw new CustomError(400, 'Name must be unique.');
    }
    const newObject = new Tasks({
        name: taskDto.name,
        user_id: taskDto.user_id,
    })
    return await newObject.save()
}


/**
* @Description this controller is use to get one task
* @Example /tasks/:id
*/
async function getOne(id: string) {
    const task = await Tasks.findById(id);
    if (!task) {
        throw new CustomError(404, 'Task not found');
    }
    return task;
}


/**
* @Description this controller is use to update task
* @Example /tasks/:id
*/
async function update(id: string, updateDto: UpdateTaskDto) {
    const findTask = await Tasks.findById(id);
    if (!findTask) {
        throw new CustomError(400, 'Task not found');
    }
    if (updateDto.name && findTask.name !== updateDto.name) {
        const isTastExist = await isThatTaskExist(updateDto.name, findTask.user_id)
        if (isTastExist) {
            throw new CustomError(400, 'Name must be unique.');
        }
    }

    await Tasks.findByIdAndUpdate(id, updateDto)
    return await Tasks.findById(id);
}


/**
* @Description this controller is use to get all task
* @Example /tasks
*/
async function getAll(user_id: string) {
    return await Tasks.find({user_id}).sort({ created_at: -1 });
}


/**
* @Description this controller is use to remove task
* @Example /tasks/:id
*/
async function remove(id: string) {
    const task = await Tasks.findById(id);
    if (!task) {
        throw new CustomError(404, 'Task not found');
    }
    return await Tasks.findByIdAndDelete(id);
}


/**
* @Description this controller is use to update status of task
* @Example /tasks/:id/status
*/
async function updateStatus(id: string, status: StatusEnum) {
    const task = await Tasks.findById(id);
    if (!task) {
        throw new CustomError(404, 'Task not found');
    }
    task.status = status;
    await task.save();
    const updatedTask = await Tasks.findById(id);
    return updatedTask;
}


/**
* @Description this controller is use to uncheck all task
* @Example /tasks/reset/uncheck-all
*/
async function unCheckeAll(user_id: string) {
    return await Tasks.updateMany({user_id}, { status: StatusEnum.TODO });
}
export default {
    create,
    getAll,
    getOne,
    update,
    remove,
    updateStatus,
    unCheckeAll

}