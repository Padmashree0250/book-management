import express from "express";
import bcrypt from "bcrypt";
import { Admin } from "./models/admin.js";
import "./db.js";

async function AdminAccount() {
  try {
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const hashpassword = await bcrypt.hash("adminpassword", 10);
      const newadmin = new Admin({
        username: "admin",
        password: hashpassword,
      });
      await newadmin.save();
      console.log("account created")
    } else {
      console.log("account already existed")
    }
  } catch (err) {
    console.log("error")
  }
}

AdminAccount();
