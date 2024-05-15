import { Request, Response, NextFunction } from "express";
import { CreateUserDto } from "../../types/users/register-user-dto";
import CustomError from "../../handler/customError";
import userService from "./user.service";

async function register(req: Request, res: Response, next: NextFunction) {
    try {
        const userDto = req.body as CreateUserDto;

        if (!userDto.username) {
            throw new CustomError(400, "username is required");
        }
        if (!userDto.password) {
            throw new CustomError(400, "password is required");
        }
        if (userDto.password.length < 6) {
            throw new CustomError(400, "password must be at least 6 characters");
        }
        const registationUser = await userService.register(userDto);

        res.status(200).send({ message: "User registered successfully", accessToken: registationUser.accessToken, refreshToken: registationUser.refreshToken});
    } catch (error) {
        next(error);
    }
}

export default {
    register
}