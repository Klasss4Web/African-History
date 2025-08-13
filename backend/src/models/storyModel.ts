import mongoose, { Document, Model, Schema } from "mongoose";

export interface IStory extends Document {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  readTime: string;
  publishedAt: Date;
  likes: number;
  comments: number;
  views: number;
  featured: boolean;
  tags: string[];
  image: string;
  color: string;
}

const StorySchema = new Schema<IStory>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    excerpt: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    readTime: {
      type: String,
      required: true,
    },
    publishedAt: {
      type: Date,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: [String],
      default: [],
    },
    image: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: "#FFFFFF",
    },
  },
  {
    timestamps: true,
  }
);

const Story: Model<IStory> = mongoose.model<IStory>("Story", StorySchema);

export default Story;
