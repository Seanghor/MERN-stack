import { Request, Response, NextFunction } from "express";
import jwtService from "../../utils/jwt-generate"
import CustomError from "../../handler/customError";
import { PayloadDto } from "../../types/users/payload-user-dto";
import auth from ".";
import authService from "./auth.service";

async function getCurrentProfile(req: Request | any, res: Response, next: NextFunction) {
    try {
        const user = req?.payload as { id: string, username: string, iat: number, exp: number };
        console.log("user", user);

        res.status(200).send({ message: "Get current profile is successfull", data: user });
    } catch (error) {
        next(error);
    }

}

async function refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            throw new CustomError(400, "Refresh token is required");
        }
        var payload = jwtService.jwtRefreshVerifier(refreshToken) as { id: string, username: string, iat: number, exp: number };
        if (!payload) {
            throw new CustomError(400, "Invalid refresh token");
        }
        const generateToken = jwtService.jwtGenerator({ id: payload?.id, username: payload.username } as PayloadDto);
        return res.status(200).send({ message: "Refresh token is successfull", accessToken: generateToken.accessToken, refreshToken: generateToken.refreshToken });

    } catch (error) {
        next(error);
    }
}

async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const { username, password } = req.body;
        if (!username) {
            throw new CustomError(400, "Username is required");
        }
        if (!password) {
            throw new CustomError(400, "Password is required");
        }

        const user = await authService.login({ username, password });
        return res.status(200).send({ message: "Login is successfull", accessToken: user.accessToken, refreshToken: user.refreshToken });

    } catch (error) {
        next(error);
    }

}

export default {
    getCurrentProfile,
    refreshToken,
    login
}