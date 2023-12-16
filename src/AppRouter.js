/** @format */

// AppRouter.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar.js";
import QuestionList from "./Components/QuestionList";
import { Home } from "./Components/Home.js";
import { AddQuestion } from "./Components/AddQuestion.js";
import { UpdateQuestion } from "./Components/UpdateQuestion.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <ToastContainer
        toastStyle={{
          fontFamily: "Dancing Script",
        }}
      />
      <Routes>
        <Route path="/questionlist" element={<QuestionList />} />
        <Route path="/" element={<Home />} />
        <Route path="/addQuestion" element={<AddQuestion />} />
        <Route path="/updateCategory" element={<UpdateQuestion />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
