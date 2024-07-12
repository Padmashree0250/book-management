import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/Login.css";

const Addbook = () => {
  const [name, setname] = useState("");
  const [author, setauthor] = useState("");
  const [imageurl, setimageurl] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/book/add", { name, author, imageurl })

      .then((res) => {
        if (res.data.added) {
          navigate("/books");
        } else {
          console.log(res);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="student-form-container">
      <form className="student-form" onSubmit={handleSubmit}>
        <h2>Add book</h2>

        <div className="form-group">
          <label htmlFor="book">book name:</label>
          <input
            type="text"
            id="book"
            name="book"
            onChange={(e) => setname(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">author name:</label>
          <input
            type="text"
            id="author"
            name="author"
            onChange={(e) => setauthor(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image URL:</label>
          <input
            type="text"
            id="image"
            name="image"
            onChange={(e) => setimageurl(e.target.value)}
          />
        </div>

        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default Addbook;
