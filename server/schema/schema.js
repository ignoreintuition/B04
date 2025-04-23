import mongoose from "mongoose";

const { Schema } = mongoose;

export const newsSchema = new Schema(
  {
    title: String,
    body: String,
  },
  {
    collection: "news",
  },
);

export const enrollmentSchema = new Schema(
  {
    profile: String,
    total: Number,
  },
  {
    collection: "enrollment",
  },
);

export const admissionSchema = new Schema(
  {
    residency: String,
    cost: Number,
  },
  { collection: "admission" },
);
