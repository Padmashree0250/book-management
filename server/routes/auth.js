import express from "express";
import { Admin } from "../models/Admin.js";
import { Student } from "../models/student.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();
router.post("/login", async (req, res) => {
  try {
    const { username, password, role } = req.body;
    if (role === "admin") {
      const admin = await Admin.findOne({ username });
      if (!admin) {
        return res.json({ message: "admin not registered" });
      }
      const validpassword = await bcrypt.compare(password, admin.password);
      if (!validpassword) {
        return res.json({ message: "wrong password" });
      }
      const token = jwt.sign(
        { username: admin.username, role: "admin" },
        process.env.Admin_key
      );
      res.cookie("token", token, { httpOnly: true, secure: true });
      return res.json({ login: true, role: "admin" });
    } else if (role === "student") {
      const student = await Student.findOne({ username });
      if (!student) {
        return res.json({ message: "student not registered" });
      }
      const validpassword = await bcrypt.compare(password, student.password);
      if (!validpassword) {
        return res.json({ message: "wrong password" });
      }
      const token = jwt.sign(
        { username: student.username, role: "student" },
        process.env.Student_key
      );
      res.cookie("token", token, { httpOnly: true, secure: true });
      return res.json({ login: true, role: "student" });
    } else {
    }
  } catch (err) {
    res.json(err);
  }
});
const verifyAdmin = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ message: "INvalid admin" });
  } else {
    jwt.verify(token, process.env.Admin_key, (err, decoded) => {
      if (err) {
        return res.json({ message: "invalid token" });
      } else {
        req.username = decoded.username;
        req.role = decoded.role;
        next();
      }
    });
  }
};

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ message: "INvalid user" });
  } else {
    jwt.verify(token, process.env.Admin_key_key, (err, decoded) => {
      if (err) {
        jwt.verify(token, process.env.Student_key, (err, decoded) => {
          if (err) {
            return res.json({ message: "invalid token" });
          } else {
            req.username = decoded.username;
            req.role = decoded.role;
            next();
          }
        });
      } else {
        req.username = decoded.username;
        req.role = decoded.role;
        next();
      }
    });
  }
};

router.get("/verify", verifyUser, (req, res) => {
  return res.json({ login: true, role: req.role });
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ logout: true });
});

export { router as Adminrouter, verifyAdmin };
