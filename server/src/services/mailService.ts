import nodeMailer, { Transporter } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport/index.js";

class MailService {
	transporter: nodeMailer.Transporter<SMTPTransport.SentMessageInfo>;

	constructor() {
			this.transporter = nodeMailer.createTransport({
				host: process.env.SMTP_HOST,
				port: Number(process.env.SMTP_PORT),
				secure: true,
				auth: {
					user: process.env.SMTP_USERNAME,
					pass: process.env.SMTP_PASSWORD
				}
			});

	}

	async sendActivationMail(to: string, link: string): Promise<void> {
		await this.transporter.sendMail({
			from: process.env.SMTP_USERNAME,
			to,
			subject: "Account activation" + process.env.API_URL,
			text: "",
			html:
				`
					<div>
						<h1>To activate please follow the link below.</h1>
						<a href="${link}">${link}</a>
					<div>
				`
		});
	}
}

export default new MailService();