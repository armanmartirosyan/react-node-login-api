import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

const app: express.Express = express();
const PORT: number = Number(process.env.PORT) || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());


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