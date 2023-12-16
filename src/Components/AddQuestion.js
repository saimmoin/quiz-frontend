/** @format */

import React from "react";
import { useState } from "react";
import "./AddQuestion.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AddQuestion = () => {
  const [questionData, setQuestionData] = useState({
    category: "",
    difficultyLevel: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    question: "",
    correctAnswer: "",
  });

  function hasEmptyValues(obj) {
    return Object.values(obj).some((value) => value === "" || value === null || value === undefined);
  }

  const notify = () => toast("Successfully Added Question!", { type: "success" });
  const notifyError = () => toast("Error While Adding Question!", { type: "error" });
  const notifyWarning = () => toast("Please Fill All The Fields!", { type: "warning" });

  const addQuestion = async () => {
    console.log(questionData);
    if (hasEmptyValues(questionData)) {
      notifyWarning();
      return;
    } else {
      try {
        const response = await axios.post("http://localhost:8080/question/add", questionData);
        console.log(response);
        notify();
        setQuestionData({
          category: "",
          difficultyLevel: "",
          option1: "",
          option2: "",
          option3: "",
          option4: "",
          question: "",
          correctAnswer: "",
        });
      } catch (error) {
        console.error("Error fetching questions:", error);
        notifyError();
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuestionData({
      ...questionData,
      [name]: value,
    });
  };

  return (
    <div>
      <div className="card">
        <h2>Add Question</h2>
        <div className="form-group">
          <label htmlFor="question" class="required">
            Set Question
          </label>
          <input
            type="text"
            id="question"
            name="question"
            value={questionData.question}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="correctAnswer" class="required">
            Set Correct Option
          </label>
          <input
            type="text"
            id="correctAnswer"
            name="correctAnswer"
            value={questionData.correctAnswer}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="option1" class="required">
            Option No.1
          </label>
          <input
            type="text"
            id="option1"
            name="option1"
            value={questionData.option1}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="option2" class="required">
            Option No.2
          </label>
          <input
            type="text"
            id="option2"
            name="option2"
            value={questionData.option2}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="option3" class="required">
            Option No.3
          </label>
          <input
            type="text"
            id="option3"
            name="option3"
            value={questionData.option3}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="option4" class="required">
            Option No.4
          </label>
          <input
            type="text"
            id="option4"
            name="option4"
            value={questionData.option4}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="category" class="required">
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={questionData.category}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="difficultyLevel" class="required">
            Difficulty
          </label>
          <input
            type="text"
            id="difficultyLevel"
            name="difficultyLevel"
            value={questionData.difficultyLevel}
            onChange={handleInputChange}
          />
        </div>
        <button className="submitBtn" type="submit" onClick={addQuestion}>
          Submit Question
        </button>
      </div>
    </div>
  );
};
