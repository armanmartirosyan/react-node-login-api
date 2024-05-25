import { IUser } from "src/config/@types/index.js";

export default class UserDTO {
	email: string;
	id: number;
	isActivated: boolean;

	constructor(model: IUser) {
		this.email = model.email;
		this.id = model.id;
		this.isActivated = model.isActivated;
	}
}