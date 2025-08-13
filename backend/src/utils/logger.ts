import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Logger {
  private logsDir: string;

  constructor() {
    this.logsDir = path.join(__dirname, "../logs");

    // Ensure the logs directory exists
    if (!fs.existsSync(this.logsDir)) {
      fs.mkdirSync(this.logsDir, { recursive: true });
    }
  }

  private writeToFile(filename: string, message: string) {
    const filePath = path.join(this.logsDir, filename);
    fs.appendFileSync(filePath, message + "\n", { encoding: "utf8" });
  }

  info(message: string) {
    const logMessage = `[INFO] ${new Date().toISOString()} - ${message}`;
    console.log(logMessage);
    this.writeToFile("app.log", logMessage);
  }

  error(message: string) {
    const logMessage = `[ERROR] ${new Date().toISOString()} - ${message}`;
    console.error(logMessage);
    this.writeToFile("error.log", logMessage);
  }
}

export default new Logger();
