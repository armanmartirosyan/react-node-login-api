import bcrypt from "bcrypt";
import * as uuid from "uuid";
import MailService from "./mailService.js";
import { IUser, IToken, TokenPair, UserTokens } from "../config/@types/index.js";
import TokenService from "./tokenService.js";
import UserDTO from "../dtos/userDto.js";
import db from "../config/knexInitialize.js";

class UserService {
	async registration(email: string, password: string): Promise<UserTokens> {
		const updated_at: Date = new Date();
		const condidate: IUser | undefined = await db<IUser>("users").where({ email }).first();
		if (condidate)
			throw new Error (`User with this ${email} already exists.`);

		const hashPassword: string = await bcrypt.hash(password, 3);
		const activationLink: string = uuid.v4();
		const [userId]: number[] = await db<IUser>("users").insert({email, password: hashPassword, activationLink, updated_at});
		const user: IUser | undefined = await db<IUser>("users").where({ id: userId }).first();

		const mailService: MailService = new MailService();
		await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

		const userDto = new UserDTO(user!);
		const tokenService: TokenService = new TokenService();
		const tokens: TokenPair = tokenService.generateTokens({ ...userDto });

		await tokenService.saveToken(userDto.id, tokens.refreshToken);
		return {user: userDto, ...tokens};
	}

	async activate(activationLink: string): Promise<void> {
		const user: IUser | undefined = await db<IUser>("users").where({ activationLink }).first();
		if (!user)
				throw new Error("Incorrect activation link.");
		user.isActivated = true;
	}
}

export default UserService;