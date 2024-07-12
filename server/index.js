import express from "express";
import dotenv from "dotenv";
import "./db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Adminrouter } from "./routes/auth.js";
import { studentRouter } from "./routes/student.js";
import { bookRouter } from "./routes/book.js";
import { Book } from "./models/Book.js";
import { Student } from "./models/student.js";
import { Admin } from "./models/Admin.js";
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(cookieParser());
dotenv.config();
app.use("/auth", Adminrouter);
app.use("/student", studentRouter);
app.use("/book", bookRouter);
app.get("/dashboard", async (req, res) => {
  try {
    const student = await Student.countDocuments();
    const admin = await Admin.countDocuments();
    const book = await Book.countDocuments();
    return res.json({ ok: true, student, book, admin });
  } catch (err) {
    return res.json(err);
  }
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`server is running ${PORT}`);
});
