import express from "express";
import {
  getAllTimelines,
  getTimelineById,
  getTimelineBySlug,
} from "../controllers/timelineController.ts";
import { methodNotAllowed } from "../middleware/errors.ts";

const timelineRoute = express.Router();

// timelineRoute.get("/", getAllStories);
timelineRoute.route("/").get(getAllTimelines).all(methodNotAllowed); // Catch all other methods
timelineRoute.route("/:id").get(getTimelineById).all(methodNotAllowed);
timelineRoute.route("/slug/:slug").get(getTimelineBySlug).all(methodNotAllowed);

export default timelineRoute;
