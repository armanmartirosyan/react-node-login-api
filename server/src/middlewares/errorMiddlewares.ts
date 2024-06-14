
import { NextFunction, Request, Response } from "express";
import APIError from "../exceptions/apiError.js";
import { writeToErrorFile } from "./morganMiddlewares.js";
import MailError from "../exceptions/mailError.js";

export default function (err: Error, req: Request, res: Response, next: NextFunction): Response<string, Record<string, any>> {
	if (err instanceof APIError)
		return res.status(err.status).json({ message: err.message, errors: err.errors });
	if (err instanceof MailError) {
		writeToErrorFile(err, err.message);
		return res.status(err.status).json({ message: err.message })
	}
	writeToErrorFile(err, "Unexpected Error");
	return res.status(500).json({ message: "Unexpected error."});
}