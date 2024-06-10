import { Request, Response, NextFunction } from "express";
import UserService from "../services/userService.js";
import { UserTokens } from "src/config/@types/index.js";

class UserController {
	userService: UserService;

	constructor() {
		this.userService = new UserService();
	}

	async registration(req: Request, res: Response, next: NextFunction) {
		try {
			const {email, password}: { email: string, password: string } = req.body;
			const userData: UserTokens = await this.userService.registration(email, password);
			res.cookie("refrshToken", userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
			return res.json(userData);
		} catch (error) {
			next(error);
		}
	}

	async login(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {

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