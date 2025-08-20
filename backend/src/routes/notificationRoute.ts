import express from "express";

import {
  sendPushNotification,
  subscribeToPushNotification,
} from "../controllers/notification.ts";
import { methodNotAllowed } from "../middleware/errors.ts";

const notificationRoute = express.Router();
notificationRoute
  .route("/save-subscription")
  .post(subscribeToPushNotification)
  .all(methodNotAllowed);

notificationRoute
  .route("/send-notification")
  .post(sendPushNotification)
  .all(methodNotAllowed);

export default notificationRoute;
