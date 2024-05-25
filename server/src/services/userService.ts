import knex, { Knex } from "knex";
import knexConfig from "../config/knexfile.js";
import bcrypt from "bcrypt";
import * as uuid from "uuid";
import MailService from "./mailService.js";
import { IUser, IToken, TokenPair, UserTokens } from "../config/@types/index.js";
import tokenService from "./tokenService.js";
import UserDTO from "../dtos/userDto.js";


const db: Knex = knex<IUser>(knexConfig);

class UserService {
	async registration(email: string, password: string): Promise<UserTokens> {
		const updated_at: Date = new Date();
		const condidate = await db<IUser>("users").where({ email }).first();
		if (condidate)
			throw new Error (`User with this ${email} already exists.`);

		const hashPassword: string = await bcrypt.hash(password, 3);
		const activationLink: string = uuid.v4();
		const [userId]: number[] = await db<IUser>("users").insert({email, password: hashPassword, activationLink, updated_at});
		const user: IUser | undefined = await db<IUser>("users").where({ id: userId }).first();
		
		// await MailService.sendActivationMail(email, activationLink);
		
		const userDto = new UserDTO(user!);
		const tokens: TokenPair = tokenService.generateTokens({ ...userDto });

		await tokenService.saveToken(userDto.id, tokens.refreshToken);
		return {user: userDto, ...tokens};
	}
}

export default new UserService();