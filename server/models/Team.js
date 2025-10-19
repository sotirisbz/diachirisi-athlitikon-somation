import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Team name is required"],
      unique: true,
      trim: true,
    },
    sport: {
      type: String,
      required: [true, "Sport is required"],
      trim: true,
    },
    category: {
      type: String,
      enum: ["youth", "junior", "senior", "professional", "amateur"],
      default: "amateur",
    },
    ageGroup: {
      type: String,
      trim: true,
    },
    coach: {
      type: String, // todo
      ref: "Staff",
    },
    assistantCoaches: [
      {
        type: String, // todo
        ref: "staff",
      },
    ],
    founded: {
      type: Date,
    },
    maxCapacity: {
      type: Number,
      default: 25,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "suspended"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

export const Team = mongoose.model("Team", teamSchema);
