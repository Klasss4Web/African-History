import mongoose, { Document, Model } from "mongoose";

export interface ISubscription extends Document {
  keys: {
    p256dh: string;
    auth: string;
  };
  endpoint: string;
}

const SubscriptionSchema = new mongoose.Schema(
  {
    endpoint: { type: String, required: true, unique: true },
    keys: {
      p256dh: String,
      auth: String,
    },
  },
  { timestamps: true }
);

const Subscription: Model<ISubscription> = mongoose.model<ISubscription>(
  "Subscription",
  SubscriptionSchema
);

export default Subscription;
