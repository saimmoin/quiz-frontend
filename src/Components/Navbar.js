/** @format */

// NavBar.js
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/questionlist">Question List</Link>
        </li>
        <li>
          <Link to="/addQuestion">Add Question</Link>
        </li>
        <li>
          <Link to="/updateCategory">Update Category</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
