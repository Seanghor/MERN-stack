import { NextFunction, Request, Response } from "express";
import itemsService from "./items.service";
async function greeting(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const greet = await itemsService.greeting("Good Morning")
        res.status(201).send(greet);
    } catch (err) {
        next(err);
    }
}

export default {
    greeting
}