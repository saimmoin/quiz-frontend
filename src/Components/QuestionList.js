/** @format */

import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import axios from "axios";
import "./QuestionList.css";
import { Loading } from "./Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get("http://localhost:8080/question/allQuestions");
      setQuestions(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const deleteQuestion = async (id) => {
    try {
      const response = await axios.delete("http://localhost:8080/question/delete/" + id);
      console.log(response);
      fetchQuestions();
      notify();
    } catch (error) {
      console.error("Error fetching questions:", error);
      if (error.response.status === 500) {
        notifyErrorUsage();
      } else {
        notifyError();
      }
    }
  };

  const notify = () => toast("Successfully Deleted Question!", { type: "success" });
  const notifyError = () => toast("Error While Deleting Question!", { type: "error" });
  const notifyErrorUsage = () => toast("This Question Is Already In Use!", { type: "warning" });

  const columnDefs = [
    { headerName: "S.no", field: "id", width: 80 },
    { headerName: "Category", field: "category", width: 200 },
    { headerName: "Difficulty Level", field: "difficultyLevel", width: 150 },
    {
      headerName: "Question",
      field: "question",
      flex: 1,
      cellStyle: { whiteSpace: "normal" },
      autoHeight: true,
    },
    {
      headerName: "Actions",
      width: 100,
      cellRenderer: "actionCellRenderer",
    },
  ];

  const gridOptions = {
    components: {
      actionCellRenderer: getActionCellRenderer(),
    },
  };

  function getActionCellRenderer() {
    function ActionCellRenderer() {}

    ActionCellRenderer.prototype.init = function (params) {
      this.eGui = document.createElement("div");
      this.eGui.innerHTML = '<button class="action-button">Delete</button>';
      this.button = this.eGui.querySelector(".action-button");
      this.button.addEventListener("click", function () {
        deleteQuestion(params.data.id);
      });
    };

    ActionCellRenderer.prototype.getGui = function () {
      return this.eGui;
    };

    return ActionCellRenderer;
  }

  return (
    <div className="ag-theme-alpine" style={{ height: "550px", width: "1000px", margin: "0 auto" }}>
      {questions.length > 0 ? (
        <>
          <h1>Total Questions: {questions.length}</h1>
          <AgGridReact
            columnDefs={columnDefs}
            gridOptions={gridOptions}
            rowData={questions}
            pagination={true}
            paginationPageSize={10}
          />
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default QuestionList;
