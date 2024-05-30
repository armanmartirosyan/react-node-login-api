import { Request, Response, NextFunction } from "express";
import userService from "../services/userService.js";
import { UserTokens } from "src/config/@types/index.js";

class UserController {
	async registration(req: Request, res: Response, next: NextFunction) {
		try {
			const {email, password}: { email: string, password: string } = req.body;
			const userData: UserTokens = await userService.registration(email, password);
			res.cookie("refrshToken", userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
			return res.json(userData);
		} catch (error) {
			if (error instanceof Error)
				res.status(409).json({ message: error.message });
		}
	}

	async login(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {

		} catch (error) {
			
		}
	}

	async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {

		} catch (error) {
			
		}
	}
	
	async activate(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {

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
			
		}
	}
}

export default new UserController();