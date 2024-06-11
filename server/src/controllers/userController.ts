import { Request, Response, NextFunction } from "express";
import { Result, ValidationError, validationResult } from "express-validator";
import UserService from "../services/userService.js";
import APIError from "../exceptions/apiError.js";
import { UserCredentials, UserTokens } from "../config/@types/index.js";

class UserController {
	userService: UserService;

	constructor() {
		this.userService = new UserService();
	}

	async registration(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | void> {
		try {
			const errors: Result<ValidationError> = validationResult(req);
			if (!errors.isEmpty())
				throw APIError.BadRequest("Validation Error", errors.array());
			const {email, password}: UserCredentials = req.body;
			const userData: UserTokens = await this.userService.registration(email, password);
			res.cookie("refrshToken", userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
			return res.json(userData);
		} catch (error) {
			next(error);
		}
	}

	async login(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | void> {
		try {
			const errors: Result<ValidationError> = validationResult(req);
			if (!errors.isEmpty())
				throw APIError.BadRequest("Validation Error", errors.array());
			const {email, password}: UserCredentials = req.body;
			const userData: UserTokens = await this.userService.login(email, password);
			res.cookie("refrshToken", userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
			return res.json(userData);
		} catch (error) {
			next(error);
		}
	}

	async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {

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
			
		}
	}

	async refresh(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {

		} catch (error) {
			
		}
	}

	async getUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			res.json(["123", "444"]);
		} catch (error) {
			next(error);
		}
	}
}

export default UserController;