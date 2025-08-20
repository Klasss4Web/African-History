import { type Request, type Response } from "express";
import asyncHandler from "express-async-handler";

import logger from "../utils/logger.ts";
import Timeline from "../models/timelineModel.ts";
import { buildQueryParams } from "../utils/queryHelper.ts";

export const getAllTimelines = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { filter, skip, limit, sort, totalPages, pageNumber } =
        buildQueryParams(req.query, [
          "title",
          "type",
          "time",
          "subtitle",
          "region",
          // "year",
          "modernLegacy",
        ]);

      const selectedFields = "year title region type time slug _id";

      const [timelines, total] = await Promise.all([
        Timeline.find(filter)
          .skip(skip)
          .limit(limit)
          .sort(sort)
          .select(selectedFields)
          .exec(),

        Timeline.countDocuments(filter),
      ]);

      logger.info("Historical timelines fetched successfully");
      res.status(200).json({
        message: "Historical timelines fetched successfully",
        page: pageNumber,
        limit,
        total,
        totalPages: totalPages(total),
        timelines,
      });
    } catch (error) {
      logger.error(`Error fetching timelines: ${error}`);
      res.status(500).json({
        message: "Failed to fetch timelines",
        error:
          process.env.NODE_ENV === "development"
            ? error
            : "Failed to fetch timelines",
      });
    }
  }
);

export const getTimelineById = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const story = await Timeline.findByIdAndUpdate(
        req.params.id,
        { $inc: { "stats.views": 1 } },
        { new: true }
      )
        .select("-__v")
        .exec();
      if (!story) {
        logger.error(`Timeline with ID ${req.params.id} not found`);
        res.status(404).json({
          message: `Timeline with ID ${req.params.id} not found`,
        });

        return;
      }
      logger.info(`Timeline with ID ${req.params.id} fetched successfully`);
      res.status(200).json({
        message: `Timeline with ID ${req.params.id} fetched successfully`,
        story,
      });
    } catch (error) {
      logger.error(
        `Error fetching timeline with ID ${req.params.id}: ${error}`
      );
      res.status(500).json({
        message: `Failed to fetch timeline with ID ${req.params.id}`,
        error:
          process.env.NODE_ENV === "development"
            ? error
            : "Failed to fetch timeline",
      });
    }
  }
);

export const getTimelineBySlug = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const story = await Timeline.findOneAndUpdate(
        { slug: req.params.slug },
        { $inc: { "stats.views": 1 } },
        { new: true }
      )
        .select("-__v")
        .exec();
      if (!story) {
        logger.error(`Timeline with ID ${req.params.id} not found`);
        res.status(404).json({
          message: `Timeline with ID ${req.params.id} not found`,
        });

        return;
      }
      logger.info(`Timeline with ID ${req.params.id} fetched successfully`);
      res.status(200).json({
        message: `Timeline with ID ${req.params.id} fetched successfully`,
        story,
      });
    } catch (error) {
      logger.error(
        `Error fetching timeline with ID ${req.params.id}: ${error}`
      );
      res.status(500).json({
        message: `Failed to fetch timeline with ID ${req.params.id}`,
        error:
          process.env.NODE_ENV === "development"
            ? error
            : "Failed to fetch timeline",
      });
    }
  }
);

export const createTimeline = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { title, subtitle, type, time, region, year, modernLegacy } =
        req.body; // Destructure the required fields from the request body

      // Validate required fields
      if (!title || !time || !region || !year) {
        res.status(400).json({
          message: "Title, time, region, and year are required fields.",
        });
        return;
      }
      // Create a new timeline document
      const newTimeline = new Timeline({
        title,
        subtitle,
        type,
        time,
        region,
        year,
        modernLegacy,
      });
      // Generate a unique slug for the timeline
      // newTimeline.slug = await generateSlug(newTimeline.title);
      // Save the new timeline to the database
      const savedTimeline = await newTimeline.save();

      logger.info("Timeline created successfully");
      res.status(201).json({
        message: "Timeline created successfully",
        timeline: savedTimeline,
      });
    } catch (error) {
      logger.error(`Error creating timeline: ${error}`);
      res.status(500).json({
        message: "Failed to create timeline",
        error:
          process.env.NODE_ENV === "development"
            ? error
            : "Failed to create timeline",
      });
    }
  }
);
export const updateTimeline = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      // Validate required fields
      if (
        !updateData.title ||
        !updateData.time ||
        !updateData.region ||
        !updateData.year
      ) {
        res.status(400).json({
          message: "Title, time, region, and year are required fields.",
        });
        return;
      }
      // Find the timeline by ID and update it
      const updatedTimeline = await Timeline.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      }).exec();
      if (!updatedTimeline) {
        logger.error(`Timeline with ID ${id} not found`);
        res.status(404).json({
          message: `Timeline with ID ${id} not found`,
        });
        return;
      }
      logger.info(`Timeline with ID ${id} updated successfully`);
      res.status(200).json({
        message: `Timeline with ID ${id} updated successfully`,
        timeline: updatedTimeline,
      });
    } catch (error) {
      logger.error(
        `Error updating timeline with ID ${req.params.id}: ${error}`
      );
      res.status(500).json({
        message: `Failed to update timeline with ID ${req.params.id}`,
        error:
          process.env.NODE_ENV === "development"
            ? error
            : "Failed to update timeline",
      });
    }
  }
);

export const deleteTimeline = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      // Find the timeline by ID and delete it
      const deletedTimeline = await Timeline.findByIdAndDelete(id).exec();
      if (!deletedTimeline) {
        logger.error(`Timeline with ID ${id} not found`);
        res.status(404).json({
          message: `Timeline with ID ${id} not found`,
        });
        return;
      }
      logger.info(`Timeline with ID ${id} deleted successfully`);
      res.status(200).json({
        message: `Timeline with ID ${id} deleted successfully`,
      });
    } catch (error) {
      logger.error(
        `Error deleting timeline with ID ${req.params.id}: ${error}`
      );
      res.status(500).json({
        message: `Failed to delete timeline with ID ${req.params.id}`,
        error:
          process.env.NODE_ENV === "development"
            ? error
            : "Failed to delete timeline",
      });
    }
  }
);
