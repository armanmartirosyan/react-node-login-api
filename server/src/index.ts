import express, { Express, Request, Response, NextFunction} from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import router from "./routes/routes.js";
import userController from "./controllers/userController.js";

dotenv.config();

const app: Express = express();
const PORT: number = Number(process.env.PORT) || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/api", router);

app.get("/", userController.registration);

const start: () => Promise<void> = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}...`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();