import mongoose, { Schema, Document, Model } from "mongoose";
import { generateSlug } from "../utils/slugGenerator.ts";

type AfricanRegions =
  | "NorthAfrica"
  | "WestAfrica"
  | "EastAfrica"
  | "CentralAfrica"
  | "SouthernAfrica";

interface ICivilization {
  name: string;
  period: string;
  region: string;
  achievements: string[];
  legacy: string;
}

export interface ITimeline extends Document {
  title: string;
  subtitle: string;
  description: string;
  overview: string;
  time?: string;
  region: AfricanRegions;
  year?: number;
  keyDevelopments: string[];
  majorCivilizations: ICivilization[];
  timeline: {
    year: string;
    event: string;
  }[];
  culturalAspects: string[];
  modernLegacy: string;
  color: string;
  image: string;
  slug: string;
}

const CivilizationSchema = new Schema<ICivilization>({
  name: { type: String, required: true },
  period: { type: String, required: true },
  region: { type: String, required: true },
  achievements: [{ type: String, required: true }],
  legacy: { type: String, required: true },
});

const TimelineSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String },
    description: { type: String },
    overview: { type: String },
    time: { type: String, required: false },
    region: { type: String, required: true },
    year: { type: Number, required: false },
    keyDevelopments: [{ type: String }],
    majorCivilizations: [CivilizationSchema],
    timeline: [
      {
        year: String,
        event: String,
      },
    ],
    culturalAspects: [String],
    modernLegacy: { type: String },
    color: { type: String },
    image: { type: String },
    slug: { type: String, unique: true }, // unique index
  },
  { timestamps: true }
);

// Generate unique slug before saving
TimelineSchema.pre<ITimeline>("save", async function (next) {
  // Check if the title is new or has been modified.
  // This ensures the slug is only regenerated when necessary.
  if (this.isNew || this.isModified("title")) {
    const baseSlug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    const regex = new RegExp(`^${baseSlug}`, "i");

    // Query existing slugs to check for uniqueness.
    const existingDocs = await mongoose.models?.Timeline?.find(
      { slug: regex },
      "slug"
    );

    const existingSlugs = existingDocs?.map((doc: any) => doc.slug);

    // Generate the unique slug.
    const newSlug = generateSlug(this.title, existingSlugs);
    console.log(`Generated slug: ${newSlug}`);

    // Use this.set() to ensure the modification is registered by Mongoose.
    this.set("slug", newSlug);
  }

  // Continue with the save operation.
  next();
});

TimelineSchema.pre<ITimeline[]>("insertMany", async function (next, docs) {
  // `docs` is the array of documents being inserted
  // You can iterate over them and modify each one
  for (const doc of docs) {
    if (doc.title) {
      // Check if title exists
      const baseSlug = doc.title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");

      const regex = new RegExp(`^${baseSlug}`, "i");

      // Query existing slugs to check for uniqueness
      const existingDocs = await mongoose.models?.Timeline?.find(
        { slug: regex },
        "slug"
      );

      const existingSlugs = existingDocs?.map((d: any) => d.slug);

      // Generate the unique slug
      const newSlug = generateSlug(doc.title, existingSlugs);

      // Update the document's slug directly
      doc.slug = newSlug;
    }
  }

  // Continue with the insert operation
  next();
});
const Timeline: Model<ITimeline> = mongoose.model<ITimeline>(
  "Timeline",
  TimelineSchema
);

export default Timeline;
