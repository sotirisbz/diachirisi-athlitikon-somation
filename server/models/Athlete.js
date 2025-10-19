import mongoose from "mongoose";

const athleteSchema = new mongoose.Schema(
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
    dateOfBirth: {
      type: Number,
      required: [true, "Date of birth is required"],
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
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
    address: {
      street: String,
      city: String,
      region: String,
      zipCode: String,
      country: String,
    },
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
    position: {
      type: String,
      trim: true,
    },
    jerseyNumber: {
      type: Number,
      min: 0,
    },
    height: {
      type: Number,
    },
    weight: {
      type: Number,
    },
    emergencyContact: {
      name: String,
      relationship: String,
      phone: String,
    },
    status: {
      type: String,
      enum: ["active", "injured", "inactive", "suspended"],
      default: "active",
    },
    joinDate: {
      type: Date,
      default: Date.now,
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Virtual for full name
athleteSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for age
athleteSchema.virtual("age").get(function () {
  const today = new Date();
  const birthDate = new Date(this.dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
});

// Ensures virtuals are include in JSON
athleteSchema.set("toJSON", { virtuals: true });
athleteSchema.set("toObject", { virtuals: true });

export default mongoose.model("Athlete", athleteSchema);
