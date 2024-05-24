import { Request, Response, NextFunction } from "express";
import userService from "../services/userService.js";

class UserController {
	async registration(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			userService.registration("test@mail.ru", "111");
			res.send(1);
		} catch (error) {

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