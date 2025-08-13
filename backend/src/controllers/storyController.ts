import asyncHandler from "express-async-handler";
import { adminOnly, protect } from "../middleware/authMiddleware.ts";
import Story from "../models/storyModel.ts";
import logger from "../utils/logger.ts";
import { type Request, type Response } from "express";

// @desc    Get all stories (Admin only)
// @route   GET /stories
// @access  Public

export const getAllStories = asyncHandler(
  async (_req: Request, res: Response) => {
    try {
      const stories = await Story.find()
        .lean() // return plain JS objects, not Mongoose docs (faster)
        .sort({ createdAt: -1 })
        .select("-__v"); // exclude mongoose version key

      logger.info("Stories fetched successfully");
      res.status(200).json({
        stories,
        message: "Stories fetched successfully",
        total: stories.length,
      });
    } catch (error) {
      console.error("Error fetching stories:", error);
      logger.error(`Error fetching stories: ${error}`);
      res.status(500).json({
        message: "Failed to fetch stories",
        error:
          process.env.NODE_ENV === "development"
            ? error
            : "Failed to fetch stories",
      });
    }
  }
);
