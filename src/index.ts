import express from "express";
import { NextFunction, Request, Response } from "express";
import config from "./config/config";
import loaders from "./loaders";
import { CustomError } from "./handler/customError";




function app() {
    const app = express();
    const port = config.PORT || 6000;
    loaders(app);
    app.use(express.json());
    app.use(
        express.urlencoded({
            extended: true,
        })
    );

    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {

        if (err instanceof CustomError) {
            res.status(err.statusCode).json({ error: err.message });
        } else {
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    app.listen(port, () => console.log(`Server is listening on port ${port}!`));
}
app();
