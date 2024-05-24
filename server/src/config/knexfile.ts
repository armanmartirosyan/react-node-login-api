import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import { Knex } from "knex";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({path: path.resolve(__dirname, "../../.env")});

const config : Knex.Config = {
    client: 'mysql2',
    connection: {
      host: process.env.MYSQL_HOST || 'localhost',
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASS || 'root',
      database: process.env.MYSQL_DATABASE || '',
    },
    migrations: {
      directory: path.join(__dirname, '..', 'config', 'db', 'migrations'),
    },
    seeds: {
      directory: path.join(__dirname, '..', 'config', 'db', 'seeds'),
    },
    
}

export default config;