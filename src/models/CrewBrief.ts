import mongoose, { Document, Schema } from "mongoose";

export interface ICrewBriefSection {
  type: "heading" | "paragraph" | "quote" | "image";
  content?: string;
  image?: string;
  leftImage?: string;
  rightImage?: string;
}

export interface ICrewBrief extends Document {
  title: string;
  date: string;
  banner?: string;
  sections: ICrewBriefSection[];
  summary?: string;
  createdAt: Date;
}

const CrewBriefSectionSchema = new Schema({
  type: {
    type: String,
    enum: ["heading", "paragraph", "quote", "image"],
    required: true,
  },
  content: {
    type: String,
    required: function (this: { type: string }) {
      return this.type !== "image";
    },
  },
  image: {
    type: String,
    trim: true,
  },
  leftImage: {
    type: String,
    trim: true,
  },
  rightImage: {
    type: String,
    trim: true,
  },
});

const CrewBriefSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: String,
      required: true,
      trim: true,
    },
    banner: {
      type: String,
      trim: true,
    },
    sections: [CrewBriefSectionSchema],
    summary: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.CrewBrief ||
  mongoose.model<ICrewBrief>("CrewBrief", CrewBriefSchema);
