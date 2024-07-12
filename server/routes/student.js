import express from "express";
import { Student } from "../models/student.js";

import bcrypt from "bcrypt";
const router = express.Router();
import { verifyAdmin } from "./auth.js";

router.post("/register",verifyAdmin, async (req, res) => {
  try {
    const { username, password, roll, grade } = req.body;
    const student = await Student.findOne({ username: username });
    if (student) {
      return res.json({ message: "Username already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newStudent = new Student({
      username,
      password: hashPassword,
      roll,
      grade,
    });
    await newStudent.save();
    return res.json({ registered: true });
  } catch (err) {
    return res.json({ message: "error in registering student" });
  }
});

export { router as studentRouter };
