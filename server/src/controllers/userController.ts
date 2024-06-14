import { Request, Response, NextFunction } from "express";
import { Result, ValidationError, validationResult } from "express-validator";
import UserService from "../services/userService.js";
import APIError from "../exceptions/apiError.js";
import { IUser, UserCredentials, UserTokens } from "../config/@types/index.js";
import UserDTO from "../dtos/userDto.js";

class UserController {
	userService: UserService;

	constructor() {
		this.userService = new UserService();
	}

	async registration(req: Request, res: Response, next: NextFunction): Promise<Response<UserTokens, Record<string, any>> | void> {
		try {
			const errors: Result<ValidationError> = validationResult(req);
			if (!errors.isEmpty())
				throw APIError.BadRequest("Validation Error", errors.array());
			const {email, password}: UserCredentials = req.body;
			const userData: UserTokens = await this.userService.registration(email, password);
			res.cookie("refreshToken", userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
			return res.json(userData);
		} catch (error) {
			next(error);
		}
	}

	async login(req: Request, res: Response, next: NextFunction): Promise<Response<UserTokens, Record<string, any>> | void> {
		try {
			const errors: Result<ValidationError> = validationResult(req);
			if (!errors.isEmpty())
				throw APIError.BadRequest("Validation Error", errors.array());
			const {email, password}: UserCredentials = req.body;
			const userData: UserTokens = await this.userService.login(email, password);
			res.cookie("refreshToken", userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
			return res.json(userData);
		} catch (error) {
			next(error);
		}
	}

	async logout(req: Request, res: Response, next: NextFunction): Promise<Response<number, Record<string, any>> | void> {
		try {
			const { refreshToken }: Record<string, string> = req.cookies;
			const token: number | undefined = await this.userService.logout(refreshToken);
			if (!token)
				return res.status(200);
			res.clearCookie("refreshToken");
			return res.status(200).json(token);
		} catch (error) {
			next(error);
		}
	}
	
	async activate(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const activationLink: string = req.params.link;
			await this.userService.activate(activationLink);
			return res.redirect(process.env.CLIENT_URL!);
		} catch (error) {
			next(error);
		}
	}

	async refresh(req: Request, res: Response, next: NextFunction): Promise<Response<UserTokens, Record<string, any>> | void> {
		try {
			const { refreshToken }: Record<string, string> = req.cookies;
			const userData: UserTokens = await this.userService.refresh(refreshToken);
			res.cookie("refreshToken", userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
			return res.json(userData);
		} catch (error) {
			next(error);
		}
	}

	async getUsers(req: Request, res: Response, next: NextFunction): Promise<Response<IUser[], Record<string, any>> | void> {
		try {
			const users: UserDTO[] = await this.userService.getAllUsers();
			return res.json(users);
		} catch (error) {
			next(error);
		}
	}
}

export default UserController;