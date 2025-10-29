import mongoose, { Document, Schema } from "mongoose";

export interface IFBOManager extends Document {
  name: string;
  email: string;
  phone: string;
  role: string;
  location: string;
  about: string;
  photo?: string;
  createdAt: Date;
  updatedAt: Date;
}

const FBOManagerSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    about: {
      type: String,
      required: true,
      trim: true,
    },
    photo: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.FBOManager ||
  mongoose.model<IFBOManager>("FBOManager", FBOManagerSchema);
