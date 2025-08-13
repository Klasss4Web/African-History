import express from "express";

import { getAllStories } from "../controllers/storyController.ts";
import { methodNotAllowed } from "../middleware/errors.ts";

// import sgMail from "@sendgrid/mail";

const storyRoute = express.Router();

// storyRoute.get("/", getAllStories);
storyRoute.route("/").get(getAllStories).all(methodNotAllowed); // Catch all other methods

export default storyRoute;
