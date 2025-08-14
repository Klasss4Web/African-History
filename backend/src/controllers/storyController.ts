import { type Request, type Response } from "express";
import asyncHandler from "express-async-handler";

import logger from "../utils/logger.ts";
import Story from "../models/storyModel.ts";
import { buildQueryParams } from "../utils/queryHelper.ts";
// import { adminOnly, protect } from "../middleware/authMiddleware.ts";

// @desc    Get all stories by filtering, searching, and pagination
// @route   GET /api/stories
// @access  Public
// @route   GET /stories
// @access  Public

export const getAllStories = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { filter, skip, limit, sort, totalPages, pageNumber } =
        buildQueryParams(req.query, ["title", "excerpt", "category", "tags"]);

      if (req.query.featured === "true" || req.query.featured === "false") {
        filter.featured = req.query.featured === "true";
      }
      // if (req.query.featured === "true") {
      //   filter.featured = true;
      // } else if (req.query.featured === "false") {
      //   filter.featured = false;
      // }

      const [stories, total] = await Promise.all([
        Story.find(filter).skip(skip).limit(limit).sort(sort).select("-__v"),
        Story.countDocuments(filter),
      ]);

      logger.info("Stories fetched successfully");
      res.status(200).json({
        message: "Stories fetched successfully",
        page: pageNumber,
        limit,
        total,
        totalPages: totalPages(total),
        stories,
      });
    } catch (error) {
      // console.error("Error fetching stories:", error);
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
