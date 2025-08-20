import express from "express";
import asyncHandler from "express-async-handler";

import users from "../data/users.ts";
import logger from "../utils/logger.ts";
import User from "../models/userModel.ts";
import Story from "../models/storyModel.ts";
import { stories } from "../data/stories.ts";
import Timeline from "../models/timelineModel.ts";
import { timelineData } from "../data/timelines.ts";

const importData = express.Router();

// ADD USERS TO THE DATA BASE
importData.post(
  "/users",
  asyncHandler(async (req, res) => {
    // Replaces deprecated `remove` method
    await User.deleteMany({});

    const importUsers = await User.insertMany(users);
    logger.info(`Imported ${importUsers.length} stories successfully!`);
    res.send({
      importUsers,
      message: "Users imported successfully!",
      total: importUsers.length,
    });
  })
);

importData.post(
  "/stories",
  asyncHandler(async (_req, res) => {
    try {
      // Replaces deprecated `remove` method
      await Story.deleteMany({});

      const importStories = await Story.insertMany(stories);
      logger.info(`Imported ${importStories.length} stories successfully!`);
      res.send({
        importStories,
        message: "Stories imported successfully!",
        total: importStories.length,
      });
    } catch (error: { message: string } | any) {
      logger.error(`Error importing stories: ${error}`);
      res.status(500).send({
        message: "Error importing stories",
        error: error.message,
      });
    }
  })
);

importData.post(
  "/timelines",
  asyncHandler(async (_req, res) => {
    try {
      // Replaces deprecated `remove` method
      await Timeline.deleteMany({});

      const importedTimelines = await Timeline.insertMany(timelineData);
      logger.info(
        `Imported ${importedTimelines.length} timelines successfully!`
      );
      res.send({
        importedTimelines,
        message: "Bulk Timelines imported successfully!",
        total: importedTimelines.length,
      });
    } catch (error: { message: string } | any) {
      logger.error(`Error importing timelines: ${error}`);
      res.status(500).send({
        message: "Error importing timelines",
        error: error.message,
      });
    }
  })
);
export default importData;
