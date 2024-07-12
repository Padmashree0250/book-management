import React, { useEffect } from "react";
import "../css/home.css";
import axios from "axios";

const Home = () => {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1 className="hero-text">Book Store</h1>
        <p className="hero-description">
          Welcome to the library,Browse the collection of our best top
          intresting books
        </p>
      </div>
      <div className="hero-image"></div>
    </div>
  );
};

export default Home;
