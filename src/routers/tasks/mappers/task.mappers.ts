import { TaskDto } from "../../../types/tasks/respone-task-dto"


function toPersistence(entity: TaskDto) {
    return {
        id: entity._id,
        user_id: entity.user_id,
        name: entity.name,
        status: entity.status,
        created_at: entity.created_at
    }
}

export default {
    toPersistence
}