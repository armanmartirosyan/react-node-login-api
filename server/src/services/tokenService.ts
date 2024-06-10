import path from "node:path";
import dotenv from "dotenv";
import { dirname } from 'path';
import knex, { Knex } from "knex";
import { fileURLToPath } from 'url';
import knexConfig from "../config/knexfile.js";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { IToken, TokenPair } from "src/config/@types/index.d.js";

const db: Knex = knex<IToken>(knexConfig);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


class TokenService {
	generateTokens(payload: JwtPayload): TokenPair {
		const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {expiresIn: "30m"});
		const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {expiresIn: "30d"});
		
		return {accessToken, refreshToken};
	}

	async saveToken(userId: number, refreshToken: string): Promise<IToken> {
		const now: Date = new Date();
		const tokenData = await db<IToken>("tokens").where({ userId }).first();
		if (tokenData) {
			tokenData.refreshToken = refreshToken;
			await db<IToken>("tokens").where({ userId}).update({ refreshToken, updated_at: now });
			return { ...tokenData, refreshToken, updated_at: now};
		}
		await db<IToken>("tokens").insert({ userId, refreshToken, updated_at: now });
		return { userId, refreshToken,created_at: now, updated_at: now};
	}
}

export default new TokenService();