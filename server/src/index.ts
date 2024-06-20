import dotenv from "dotenv";
import express, { Express } from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import router from "./routes/routes.js";
import knex from "./config/knexInitialize.js";
import errorMiddlewares from "./middlewares/errorMiddlewares.js";
import morganConfig from "./middlewares/morganMiddlewares.js";

dotenv.config();

const app: Express = express();
const PORT: number = Number(process.env.PORT) || 5000;

app.use(morgan("common", { stream: morganConfig()}));
app.use(express.json());
app.use(cookieParser());
app.use(cors( {
    credentials: true,
    origin: process.env.CLIENT_URL,
}));
app.use("/api", router);
app.use(errorMiddlewares);


async function start(): Promise<void> {
    try {
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}...`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();

process.on("SIGINT", async (): Promise<void> => {
    console.log("Recieved SIGINT signal. Gracefully shutting down...");
    await knex.destroy();
    process.exit(130);
});