import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/Login.css";

const Addstudent = () => {
  const [roll, setRoll] = useState("");
  const [username, setUsername] = useState("");
  const [grade, setGrade] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Retrieve existing students from local storage
    const existingStudents = JSON.parse(localStorage.getItem("students")) || [];

    // Check if the roll number already exists
    const rollExists = existingStudents.some(student => student.roll === roll);
    if (rollExists) {
      toast.error("Roll number already exists. Please use a different one.");
      return;
    }

    // Add new student to local storage
    const newStudent = { roll, username, grade, password };
    const updatedStudents = [...existingStudents, newStudent];
    localStorage.setItem("students", JSON.stringify(updatedStudents));

    // Notify the user and navigate to dashboard
    toast.success("Student registered successfully!");
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000); // Delay to allow the notification to appear
  };

  return (
    <div className="student-form-container">
      <form className="student-form" onSubmit={handleSubmit}>
        <h2>Add Student</h2>

        <div className="form-group">
          <label htmlFor="roll">Roll No:</label>
          <input
            type="text"
            id="roll"
            name="roll"
            value={roll}
            onChange={(e) => setRoll(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="grade">Grade:</label>
          <input
            type="text"
            id="grade"
            name="grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Addstudent;
