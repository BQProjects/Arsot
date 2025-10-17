import mongoose, { Document, Schema } from "mongoose";

export interface IPressReleaseSection {
  type: "heading" | "paragraph" | "quote" | "image";
  content?: string;
  image?: string;
  leftImage?: string;
  rightImage?: string;
}

export interface IPressRelease extends Document {
  title: string;
  date: string;
  banner?: string;
  sections: IPressReleaseSection[];
  summary?: string;
  createdAt: Date;
}

const PressReleaseSectionSchema = new Schema({
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

const PressReleaseSchema = new Schema(
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
    sections: [PressReleaseSectionSchema],
    summary: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.PressRelease ||
  mongoose.model<IPressRelease>("PressRelease", PressReleaseSchema);
