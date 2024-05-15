
import { UserDto } from "../../../types/users/user-dto"


function toPersistence(entity: UserDto) {
    return {
        id: entity._id,
        username: entity.username,
        password: entity.password,
        created_at: entity.created_at
    }
}

export default {
    toPersistence
}