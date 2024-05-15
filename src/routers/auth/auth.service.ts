import { LoginDto } from "../../types/users/login-user-dto";
import bcrypt from "bcrypt";
import userService from "../users/user.service";
import CustomError from "../../handler/customError";
import jwtService from "../../utils/jwt-generate";
import { PayloadDto } from "../../types/users/payload-user-dto";

/**
* @Description this controller is use to login
* @Example /tasks
*/
async function login(credentaials: LoginDto) {

    const user = await userService.getUserByUsername(credentaials.username);
    if (!user) {
        throw new CustomError(404, "User not found");
    }
    const isPasswordMatch = await bcrypt.compare(credentaials.password, user.password);
    if (!isPasswordMatch) {
        throw new CustomError(400, "Incorrect Password");
    }
    const token = await jwtService.jwtGenerator({ id: user?._id, username: user.username });
    return token;
    
}

export default {
    login
}