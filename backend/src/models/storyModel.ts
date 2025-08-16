import mongoose, { Document, Model, Schema, Types } from "mongoose";

interface IReply {
  author: string;
  content: string;
}
export interface IComment extends Document {
  author: string;
  content: string;
  avatar?: string;
  date?: Date;
  likes?: number;
  replies?: IReply[];
}

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
  comments: Types.DocumentArray<IComment>;
  featured: boolean;
  tags: string[];
  image: string;
  color: string;
  content: string;
  stats: {
    likes: number;
    comments: number;
    views: number;
    bookmarks: number;
  };
}

const replySchema = new mongoose.Schema({
  author: { type: String, required: true },
  avatar: { type: String },
  date: { type: Date, default: Date.now },
  content: { type: String, required: true },
  likes: { type: Number, default: 0 },
});

const commentSchema = new mongoose.Schema({
  author: { type: String, required: true },
  avatar: { type: String },
  date: { type: Date, default: Date.now },
  content: { type: String, required: true },
  likes: { type: Number, default: 0 },
  replies: [replySchema],
});

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
    content: {
      type: String,
      required: true,
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
    stats: {
      views: { type: Number, default: 0 },
      likes: { type: Number, default: 0 },
      comments: { type: Number, default: 0 },
      bookmarks: { type: Number, default: 0 },
    },
    comments: [commentSchema],
  },
  {
    timestamps: true,
  }
);

const Story: Model<IStory> = mongoose.model<IStory>("Story", StorySchema);

export default Story;
