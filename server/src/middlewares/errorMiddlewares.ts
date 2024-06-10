
import { NextFunction, Request, Response } from "express";
import APIError from "../exceptions/apiError.js";
import { writeToErrorFile } from "./morganMiddlewares.js";

export default function (err: Error, req: Request, res: Response, next: NextFunction) {
	if (err instanceof APIError)
		return res.status(err.status).json({message: err.message, errors: err.errors});
	writeToErrorFile(err);
	return res.status(500).json({ message: "Unexpected error."});
}