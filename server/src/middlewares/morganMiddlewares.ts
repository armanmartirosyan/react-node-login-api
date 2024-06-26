import { fileURLToPath } from "node:url";
import fs from "node:fs";
import path from "node:path";
import { Writable } from "node:stream";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const colors = {
	reset: "\x1b[0m",
	red: "\x1b[31m",
	green: "\x1b[32m",
	yellow: "\x1b[33m",
	blue: "\x1b[34m",
	magenta: "\x1b[35m",
	cyan: "\x1b[36m",
};

export function writeToErrorFile(err: Error, info: string) {
	console.log(`${colors.red}${info}: Check './logs/error.log' for details.${colors.reset}`);
	fs.appendFile(path.join(__dirname, "..", "logs", "error.log"), `${new Date().toISOString()}: ${err.stack}\n\n`, (error) => {
		if (error)
			console.error('Error logging to error.log:', error);
	});
}

function createDirectory(): void {
	try {
		const folderName = path.join(__dirname, "..", "logs");
		if (!fs.existsSync(folderName)) {
			fs.mkdirSync(folderName);
			console.log("Directory for storing logs created successfully");
		}
	} catch(error) {
		console.error("Error creating directory:", error);
		process.exit(1);
	}
}

function createErrorLogFile(): void {
	const filePath = path.join(__dirname, "..", "logs", "error.log");
	if (!fs.existsSync(filePath)) {
		fs.writeFileSync(filePath, "");
	}
}

export default function morganConfig(): Writable  {
	createDirectory();
	createErrorLogFile();
	return fs.createWriteStream(path.join(__dirname, "..", "logs", "server.log"), {flags: "a"})
}