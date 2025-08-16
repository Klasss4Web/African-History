import express, { type Request, type Response } from "express";

// import products from "./data/product.js";
import cors from "cors";
import dotenv from "dotenv";
import importData from "./routes/dataImport.ts";
import connectToDataBase from "./configs/database.ts";
import { errorHandler, notFound } from "./middleware/errors.ts";
import storyRoute from "./routes/storyRoute.ts";
// import sgMail from "@sendgrid/mail";

dotenv.config();
connectToDataBase();
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use(express.json());

// export const sendMail = sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// API
app.use("/api/v1/import", importData);
app.use("/api/v1/stories", storyRoute);

//ERROR HANDLER
app.use(notFound);
app.use(errorHandler);

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello from TypeScript + Express + Nodemon!");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
