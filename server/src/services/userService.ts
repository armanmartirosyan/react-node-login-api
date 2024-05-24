import knex, { Knex } from "knex";
import knexConfig from "../config/knexfile.js";
import bcrypt from "bcrypt";
import * as uuid from "uuid";
import MailService from "./mailService.js";


const db = knex(knexConfig);

class UserService {
	async registration(email: string, password: string): Promise<void> {
		const condidate = await db("users").where({ email }).first();
		if (condidate)
			throw new Error (`User with this ${email} already exists.`);
		const hashedPassword = await bcrypt.hash(password, 3);
		const user = await db("users");
		// insert({email: "test@mail.ru", password: "111", activationLink: "somelink"})
		
	}
}

export default new UserService();