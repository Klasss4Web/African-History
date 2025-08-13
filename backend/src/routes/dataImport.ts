import express from "express";
import users from "../data/users.ts";
import User from "../models/userModel.ts";
import asyncHandler from "express-async-handler";

const importData = express.Router();

// ADD USERS TO THE DATA BASE
importData.post(
  "/users",
  asyncHandler(async (req, res) => {
    // Replaces deprecated `remove` method
    await User.deleteMany({});

    const importUsers = await User.insertMany(users);

    res.send({ importUsers });
  })
);

export default importData;
