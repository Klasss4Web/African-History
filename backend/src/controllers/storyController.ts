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

      const selectedFields =
        "title excerpt category author readTime publishedAt likes comments views featured tags image color";

      const [stories, total] = await Promise.all([
        Story.find(filter)
          .skip(skip)
          .limit(limit)
          .sort(sort)
          .select(selectedFields)
          .exec(),
        // .select("-__v"),
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

export const getStoryById = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const story = await Story.findByIdAndUpdate(
        req.params.id,
        { $inc: { "stats.views": 1 } },
        { new: true }
      )
        .select("-__v")
        .exec();
      if (!story) {
        logger.error(`Story with ID ${req.params.id} not found`);
        res.status(404).json({
          message: `Story with ID ${req.params.id} not found`,
        });

        return;
      }
      logger.info(`Story with ID ${req.params.id} fetched successfully`);
      res.status(200).json({
        message: `Story with ID ${req.params.id} fetched successfully`,
        story,
      });
    } catch (error) {
      logger.error(`Error fetching story with ID ${req.params.id}: ${error}`);
      res.status(500).json({
        message: `Failed to fetch story with ID ${req.params.id}`,
        error:
          process.env.NODE_ENV === "development"
            ? error
            : "Failed to fetch story",
      });
    }
  }
);

// routes/comments.route.ts
/**
 * GET all comments for a story
 */

export const getStoryCommentsById = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { storyId } = req.params;
      const story = await Story.findById(storyId, "comments")
        .select("-__v")
        .exec();

      if (!story) {
        logger.error(`Story with ID ${storyId} not found`);
        res.status(404).json({
          message: `Story with ID ${storyId} not found`,
        });
        return;
      }
      logger.info(`Comments fetched successfully for story ID: ${storyId}`);
      res.status(200).json({
        message: `Comments fetched successfully`,
        comments: story.comments,
      });
    } catch (error) {
      logger.error(
        `Error fetching comments with ID ${req.params.storyId}: ${error}`
      );
      res.status(500).json({
        message: `Failed to fetch story with ID`,
        error:
          process.env.NODE_ENV === "development"
            ? error
            : "Failed to fetch story",
      });
    }
  }
);

/**
 * POST a new comment to a story
 */

export const postStoryCommentsById = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { storyId } = req.params;
      const { author, content } = req.body;
      if (!author || !content) {
        res.status(400).json({ error: "Author and content are required" });
        return;
      }
      const story = await Story.findById(storyId);
      if (!story) {
        res.status(404).json({ error: "Story not found" });
        return;
      }
      const newComment = {
        author,
        content,
      };
      story.comments.push(newComment);
      await story.save();
      res.status(201).json({
        message: "Comment posted successfully",
      });
      logger.info(
        `Comment posted successfully to story with ID ${req.params.storyId}`
      );
    } catch (error) {
      logger.error(
        `Error posting comment to story with ID ${req.params.storyId}: ${error}`
      );
      res.status(500).json({
        message: `Failed to post comment story`,
        error:
          process.env.NODE_ENV === "development"
            ? error
            : "Failed to fetch story",
      });
    }
  }
);

/**
 * POST a new comment replies to a story
 */

export const postStoryCommentsRepliesById = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { storyId, commentId } = req.params;
      const { author, content } = req.body;

      if (!author || !content) {
        res.status(400).json({ error: "Author and content are required" });

        return;
      }

      const story = await Story.findById(storyId);
      if (!story) {
        res.status(404).json({ error: "Story not found" });

        return;
      }
      const comment = story?.comments?.id(commentId as string);
      if (!comment) {
        res.status(404).json({ error: "Comment not found" });
        return;
      }
      const newReply = {
        author,
        content,
      };

      comment.replies?.push(newReply);
      await story.save();

      res.status(201).json(newReply);
      logger.info(
        `Reply posted successfully to comment with ID ${req.params.storyId}`
      );
    } catch (error) {
      logger.error(
        `Error posting comment to story with ID ${req.params.storyId}: ${error}`
      );
      res.status(500).json({
        message: `Failed to post comment story`,
        error:
          process.env.NODE_ENV === "development"
            ? error
            : "Failed to fetch story",
      });
    }
  }
);
