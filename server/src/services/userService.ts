import bcrypt from "bcrypt";
import * as uuid from "uuid";
import MailService from "./mailService.js";
import { IUser, VerifiedJWT, TokenPair, UserTokens, IToken } from "../config/@types/index.js";
import TokenService from "./tokenService.js";
import UserDTO from "../dtos/userDto.js";
import db from "../config/knexInitialize.js";
import APIError from "../exceptions/apiError.js";

class UserService {
	tokenService: TokenService;
	mailService: MailService;

	constructor() {
		this.tokenService = new TokenService();
		this.mailService = new MailService();
	}

	async registration(email: string, password: string): Promise<UserTokens> {
		const updated_at: Date = new Date();
		const condidate: IUser | undefined = await db<IUser>("users").where({ email }).first();
		if (condidate)
			throw APIError.BadRequest(`User with this ${email} already exists.`);

		const hashPassword: string = await bcrypt.hash(password, 3);
		const activationLink: string = uuid.v4();
		const [userId]: number[] = await db<IUser>("users").insert({email, password: hashPassword, activationLink, updated_at});
		const user: IUser | undefined = await db<IUser>("users").where({ id: userId }).first();

		await this.mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

		const userDto = new UserDTO(user!);
		const tokens: TokenPair = this.tokenService.generateTokens({ ...userDto });

		await this.tokenService.saveToken(userDto.id, tokens.refreshToken);
		return {user: userDto, ...tokens};
	}

	async activate(activationLink: string): Promise<void> {
		const user: IUser | undefined = await db<IUser>("users").where({ activationLink }).first();
		if (!user)
				throw APIError.BadRequest("Incorrect activation link.");
		await db<IUser>("users").where({ id: user.id }).update({ isActivated: true });
	}

	async login(email: string, password: string): Promise<UserTokens> {
		const user: IUser | undefined = await db<IUser>("users").where({ email }).first();
		if (!user)
			throw APIError.BadRequest("Invalid email or password.");

		const passwordMatch: boolean = await bcrypt.compare(password, user.password);
		if (!passwordMatch)
				throw APIError.BadRequest("Invalid email or password.");

		const userDto = new UserDTO(user);
		const tokens: TokenPair = this.tokenService.generateTokens({ ...userDto });
		await this.tokenService.saveToken(userDto.id, tokens.refreshToken);

		return {user: userDto, ...tokens};
	}

	async logout(refreshToken: string): Promise<number | undefined> {
		const token: number | undefined = await this.tokenService.removeToken(refreshToken);
		return token;
	}

	async refresh(refreshToken: string): Promise<UserTokens> {
		if (!refreshToken)
			throw APIError.UnauthorizedError();
		const userData: VerifiedJWT = this.tokenService.validateRefreshToken(refreshToken);
		const isTokenInDB: IToken | undefined = await this.tokenService.findToken(refreshToken);
		if (!userData || !isTokenInDB)
				throw APIError.UnauthorizedError();

		const user: IUser | undefined = await db<IUser>("users").where({ id: userData.id }).first();
		if (!user)
				throw APIError.UnauthorizedError();
		const userDto = new UserDTO(user);
		const tokens: TokenPair = this.tokenService.generateTokens({ ...userDto });
		await this.tokenService.saveToken(userDto.id, tokens.refreshToken);

		return {user: userDto, ...tokens};
	}

	async getAllUsers(): Promise<UserDTO[]> {
		const users: IUser[] = await db<IUser>("users").select("*");
		const usersDTO: UserDTO[] = [];

		users.forEach((user: IUser) => {
			const userDto: UserDTO = new UserDTO(user);
			usersDTO.push(userDto);
		});
	
		return usersDTO;
	}
}

export default UserService;