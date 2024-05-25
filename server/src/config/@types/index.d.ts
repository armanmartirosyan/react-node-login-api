import UserDTO from "../../dtos/userDto.js";

export interface IUser {
	id: number;
	email: string;
	password: string;
	isActivated: boolean;
	activationLink?: string | undefined;
	created_at: Date;
	updated_at: Date;
}

export interface IToken {
    userId: number;
    refreshToken: string;
    created_at: Date;
    updated_at: Date;
}

export interface TokenPair {
	accessToken: string;
	refreshToken: string;
}

export interface UserTokens{
    user: UserDTO;
    accessToken: string;
    refreshToken: string;
}