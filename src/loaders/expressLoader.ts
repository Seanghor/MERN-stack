import express, { Application, json } from "express";
import routes from "../routers/index"
import cors from "cors";
import mongoose from "mongoose";
import { rateLimiterUsingThirdParty } from "../middleware/ratelimite";

export default (app: Application) => {
    require("dotenv").config();

    app.use(
        express.urlencoded({
            extended: true,
        })
    );
    app.use(cors());
    app.use(rateLimiterUsingThirdParty);
    app.use(json());

    // const base = config.DATABASE_URL
    // console.log("base", base);
    
    // mongoose.connect(base);
    // const database = mongoose.connection;

    // database.on('error', (error) => {
    //     console.log(error)
    // })

    // database.once('connected', () => {
    //     console.log('Database Connected');
    // })

    routes(app);
};
