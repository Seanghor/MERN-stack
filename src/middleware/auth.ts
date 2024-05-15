import { NextFunction, Response, Request } from "express";
import { verify } from "jsonwebtoken";
import config from "../config/config";
import jwt from "jsonwebtoken";
import CustomError from "../handler/customError";

function isAuth(req: any, res: Response, next: NextFunction) {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');
      if (!token) {
        res.status(401);
        throw new CustomError(401, '🚫 Un-Authorized 🚫');
      }
      const payload = jwt.verify(token, config.ACCESS_SECRET) as any; 
      req.payload = payload;
    } catch (err:any) {
      res.status(401);
      if (err.name === 'TokenExpiredError') {
        // throw new Error(err.name);
        throw new CustomError(401, 'Token Expired');
      }
      throw new CustomError(401, '🚫 Un-Authorized 🚫');
    }
    return next();
  }

  export default isAuth;