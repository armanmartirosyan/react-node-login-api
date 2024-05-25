import nodeMailer, { Transporter } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport/index.js";

class MailService {
	// transporter: Transporter<SMTPTransport.SentMessageInfo>;

	constructor() {
		// this.transporter = nodeMailer.createTestAccount();
	}

	async sendActivationMail(to: string, link: string): Promise<void> {
		
	}
}

export default new MailService();