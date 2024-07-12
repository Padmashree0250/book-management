import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../css/Login.css";

const Editbook = () => {
  const [name, setname] = useState("");
  const [author, setauthor] = useState("");
  const [imageurl, setimageurl] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    axios
      .get("http://localhost:3001/book/book/" + id)

      .then((res) => {
        setname(res.data.name);
        setauthor(res.data.author);
        setimageurl(res.data.imageurl);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3001/book/book/" + id, {
        name,
        author,
        imageurl,
      })

      .then((res) => {
        if (res.data.updated) {
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
        <h2>Edit book</h2>

        <div className="form-group">
          <label htmlFor="book">book name:</label>
          <input
            type="text"
            id="book"
            name="book"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">author name:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={author}
            onChange={(e) => setauthor(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image URL:</label>
          <input
            type="text"
            id="image"
            name="image"
            value={imageurl}
            onChange={(e) => setimageurl(e.target.value)}
          />
        </div>

        <button type="submit">update</button>
      </form>
    </div>
  );
};

export default Editbook;
