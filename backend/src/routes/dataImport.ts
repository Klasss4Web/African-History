import express from "express";
import asyncHandler from "express-async-handler";

import users from "../data/users.ts";
import logger from "../utils/logger.ts";
import User from "../models/userModel.ts";
import Story from "../models/storyModel.ts";
import { stories } from "../data/stories.ts";

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
    } catch (error) {
      logger.error(`Error importing stories: ${error}`);
      res.status(500).send({
        message: "Error importing stories",
        error: error.message,
      });
    }
  })
);

export default importData;
