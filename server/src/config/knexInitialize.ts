import knex, { Knex } from "knex";
import knexConfig from "./knexfile.js";

const db: Knex = knex(knexConfig);

export default db;