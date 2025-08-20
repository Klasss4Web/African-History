import webpush from "web-push";
import dotenv from "dotenv";
import { type Request, type Response } from "express";

dotenv.config();

import logger from "../utils/logger.ts";
import Subscription from "../models/notificationModel.ts";

const vapidDetails = {
  publicKey: process.env.VAPID_PUBLIC_KEY as string,
  privateKey: process.env.VAPID_PRIVATE_KEY as string,
};

webpush.setVapidDetails(
  "mailto:eochade15@gmail.com",
  vapidDetails.publicKey,
  vapidDetails.privateKey
);

export const subscribeToPushNotification = async (
  req: Request,
  res: Response
) => {
  try {
    const subscription = req.body;

    // Prevent duplicate subscriptions (unique by endpoint)
    const existing = await Subscription.findOne({
      endpoint: subscription.endpoint,
    });

    if (!existing) {
      await Subscription.create(subscription);
      console.log("✅ New subscription saved:", subscription.endpoint);
    } else {
      console.log("⚠️ Subscription already exists:", subscription.endpoint);
      res.status(429).json({ error: "⚠️ Subscription already exists:" });
    }

    logger.info(`📩 Subscription saved:, ${subscription.endpoint}`);
    res.status(201).json({ message: "Subscription saved in DB" });
  } catch (err) {
    console.error("DB error:", err);
    logger.error(`Subscription DB error:", ${err}`);
    res.status(500).json({ error: "Failed to save subscription" });
  }
};

export const sendPushNotification = async (req: Request, res: Response) => {
  const payload = JSON.stringify(
    req.body || {
      title: "Test push 🔔",
      body: "Hello from the server!",
      url: "/",
    }
  );

  const subs = await Subscription.find();
  const results = await Promise.allSettled(
    subs.map(async (sub) => {
      try {
        await webpush.sendNotification(sub, payload);
        logger.info(`Push notification sent successfull`);
      } catch (err: { statusCode?: number } | any) {
        console.error("Push failed:", err);
        logger.error(`Push failed: ${err}`);
        // Cleanup invalid subscriptions
        if (err.statusCode === 410 || err.statusCode === 404) {
          await Subscription.deleteOne({ _id: sub._id });
          console.log("🗑 Removed expired subscription:", sub.endpoint);
        }
      }
    })
  );

  res.json({ sent: results.length });
};

// STEPS
// npm install web-push
// npx web-push generate-vapid-keys
// Public Key:  BEXAMPLEc9nGm...
// Private Key:  1EXAMPLE7uA...
// VAPID_PUBLIC_KEY=BEXAMPLEc9nGm...
// VAPID_PRIVATE_KEY=1EXAMPLE7uA...
