import mongoose from "mongoose";

const staffSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: [
        "head_coach",
        "assistant_coach",
        "trainer",
        "physiotherapist",
        "manager",
        "administartor",
        "other",
      ],
      required: true,
    },
    specialization: {
      type: String,
      trim: true,
    },
    hireDate: {
      type: Date,
      default: Date.now,
    },
    salary: {
      type: Number,
    },
    qualifications: [
      {
        type: String,
      },
    ],
    assignedTeams: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
      },
    ],
    status: {
      type: String,
      enum: ["active", "inactive", "on_leave"],
      default: "active",
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

staffSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

staffSchema.set("toJSON", { virtuals: true });
staffSchema.set("toObject", { virtuals: true });

export const Staff = mongoose.model("Staff", staffSchema);
