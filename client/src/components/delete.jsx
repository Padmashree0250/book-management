import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
const Deletebook = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    axios
      //.delete("http://localhost:3001/book/book/" + id)
      .delete("https://book-management-vsqt.vercel.app/book/book/" + id)
      
      .then((res) => {
        if (res.data.deleted) {
          navigate("/books");
        }
      })
      .catch((err) => console.log(err));
  }, []);
};

export default Deletebook;
