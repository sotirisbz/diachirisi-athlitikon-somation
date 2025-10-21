import express from "express";
import { Staff } from "../models/Staff.js";

const router = express.Router();

// Get all staff
router.get("/", async (req, res, next) => {
  try {
    const staff = await Staff.find()
      .populate("assignedTeam")
      .sort({ createdAt: -1 });
    res.json(staff);
  } catch (err) {
    next(err);
    s;
  }
});

// Get single staff member
router.get("/:id", async (req, res, next) => {
  try {
    const staff = await Staff.findById(req.params.id).populate("assignedTeam");
    if (!staff) {
      return res.status(404).json({ message: "Staff member not found" });
    }
    res.json(staff);
  } catch (err) {
    next(err);
  }
});

// Create staff member
router.post("/", async (req, res, next) => {
  try {
    const staff = new Staff(req.body);
    await staff.save();
    const populated = await Staff.findById(staff._id).populate("assignedTeams");
    res.status(201).json(populated);
  } catch (err) {
    next(err);
  }
});

// Update staff member
router.put("/:id", async (req, res, next) => {
  try {
    const staff = await Staff.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("assignedTeams");

    if (!staff) {
      return res.status(404).json({ message: "Staff member not found" });
    }
    res.json(staff);
  } catch (err) {
    next(err);
  }
});

// Delete staff member
router.delete("/:id", async (req, res, next) => {
  try {
    const staff = await Staff.findByIdAndDelete(req.params.id);
    if (!staff) {
      return res.status(404).json({ message: "Staff member not found" });
    }
    res.json({ message: "Staff member deleted successfully" });
  } catch (err) {
    next(err);
  }
});

export default router;
