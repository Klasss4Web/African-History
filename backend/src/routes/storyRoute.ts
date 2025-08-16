import express from "express";

import {
  getAllStories,
  getStoryById,
  getStoryCommentsById,
  postStoryCommentsById,
  postStoryCommentsRepliesById,
} from "../controllers/storyController.ts";
import { methodNotAllowed } from "../middleware/errors.ts";

// import sgMail from "@sendgrid/mail";

const storyRoute = express.Router();

// storyRoute.get("/", getAllStories);
storyRoute.route("/").get(getAllStories).all(methodNotAllowed); // Catch all other methods
storyRoute.route("/:id").get(getStoryById).all(methodNotAllowed);
storyRoute
  .route("/:storyId/comments")
  .get(getStoryCommentsById)
  .all(methodNotAllowed);
storyRoute
  .route("/:storyId/comments")
  .post(postStoryCommentsById)
  .all(methodNotAllowed);
storyRoute
  .route("/:storyId/comments/:commentId/replies")
  .post(postStoryCommentsRepliesById)
  .all(methodNotAllowed);

export default storyRoute;
