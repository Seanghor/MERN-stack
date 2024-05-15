
import Users from "../../database/models/users"
import CustomError from "../../handler/customError";
import { PayloadDto } from "../../types/users/payload-user-dto";
import { CreateUserDto } from "../../types/users/register-user-dto"
import jwtService from "../../utils/jwt-generate"
import userMappers from "./mapppers/user.mappers";
import bcrypt from "bcrypt";

/**
* @Description this controller is use to register user
*/
async function register(userDto: CreateUserDto) {
    const isUserExist = await Users.findOne({ username: userDto.username })
    if (isUserExist) {
        throw new CustomError(400, 'Username must be unique.');
    }
    const newObject = new Users({
        username: userDto.username,
        password: await bcrypt.hash(userDto.password, 10)
    })
    await newObject.save()

    const newUser = await Users.findOne({ username: userDto.username })
    const token = jwtService.jwtGenerator({ id: newUser?._id || "", username: newUser?.username } as PayloadDto)
    return token

}


/**
* @Description this controller is use to get user by username
*/
async function getUserByUsername(username: string) {
    return await Users.findOne({ username: username })
}


/**
* @Description this controller is use to get user by id
*/
async function getUserById(id: string) {
    return await Users.findById(id)
}

export default {
    register,
    getUserByUsername,
    getUserById
}