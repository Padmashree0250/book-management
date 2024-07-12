import React from "react";
import { Link } from "react-router-dom";

const BookCard = ({ book ,role}) => {
  const { name, author, imageurl } = book;
  return (
    <div className="book-card">
      <img src={imageurl} alt={name} className="book-image" />
      <div className="book-details">
        <h3>{name}</h3>
        <p>{author}</p>
      </div>
      {role=== "admin" &&
      <div className="book-actions">
      <button>
        <Link to={`/book/${book._id}`} className='btn-link'> edit</Link>
      </button>
      <button>
        <Link to={`/delete/${book._id}`} className='btn-link'> delete</Link>
      </button>
    </div>
      }
      
    </div>
  );
};

export default BookCard;
