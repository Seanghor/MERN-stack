import mongoose from "mongoose";
import { StatusEnum } from "../../types/tasks/task-enum";
import CustomError from "../../handler/customError";

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: [StatusEnum.TODO, StatusEnum.DONE], // Define the enum values
        default: StatusEnum.TODO
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    }
});


const Tasks = mongoose.model('Tasks', taskSchema);
export default Tasks;

