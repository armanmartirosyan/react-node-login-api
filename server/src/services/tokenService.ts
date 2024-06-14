import jwt, { JwtPayload } from "jsonwebtoken";
import { IToken, TokenPair, VerifiedJWT } from "../config/@types/index.d.js";
import db from "../config/knexInitialize.js";

class TokenService {
	generateTokens(payload: JwtPayload): TokenPair {
		const accessToken: string = jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {expiresIn: "30m"});
		const refreshToken: string = jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {expiresIn: "30d"});
		
		return {accessToken, refreshToken};
	}

	async saveToken(userId: number, refreshToken: string): Promise<IToken> {
		const now: Date = new Date();
		const tokenData: IToken | undefined = await db<IToken>("tokens").where({ userId }).first();
		if (tokenData) {
			tokenData.refreshToken = refreshToken;
			await db<IToken>("tokens").where({ userId}).update({ refreshToken, updated_at: now });
			return { ...tokenData, refreshToken, updated_at: now};
		}
		await db<IToken>("tokens").insert({ userId, refreshToken, created_at: now, updated_at: now });
		return { userId, refreshToken, created_at: now, updated_at: now};
	}

	async removeToken(refreshToken: string): Promise<number | undefined> {
		const result: number = await db<IToken>("tokens").where({ refreshToken }).del();
		return result;
	}

	async findToken(refreshToken: string): Promise<IToken | undefined> {
		const result: IToken | undefined = await db<IToken>("tokens").where({ refreshToken }).first();
		return result;
	}

	validateAccessToken(token: string): VerifiedJWT {
		try {
			const userData: string | jwt.JwtPayload = jwt.verify(token, process.env.JWT_ACCESS_SECRET!);
			return userData;
		} catch (error) {
			return null;
		}
	}

	validateRefreshToken(token: string): VerifiedJWT {
		try {
			const userData: string | jwt.JwtPayload = jwt.verify(token, process.env.JWT_REFRESH_SECRET!);
			return userData;
		} catch (error) {
			return null;
		}
	}
}

export default TokenService;