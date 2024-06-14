import APIError from "../exceptions/apiError.js";
import { NextFunction, Request, Response } from "express";
import TokenService from "../services/tokenService.js";
import { VerifiedJWT } from "../config/@types/index.js";


export default function (req: Request, res: Response, next: NextFunction): Response<string, Record<string, any>> | void {
	try {
		const authorizationHeader: string | undefined = req.headers.authorization;
		if (!authorizationHeader)
				return next(APIError.UnauthorizedError());
		
		const accessToken: string = authorizationHeader.split(' ')[1];
		if (!accessToken)
			return next(APIError.UnauthorizedError());
		
		const tokenService: TokenService = new TokenService();
		const userData: VerifiedJWT = tokenService.validateAccessToken(accessToken);
		if (!userData)
			return next(APIError.UnauthorizedError());
		next();
	} catch (error) {
		return next(APIError.UnauthorizedError());
	}
}