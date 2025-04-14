import React, { useState, useEffect, useRef } from "react";
import Questions from "../MainComponents/Questions";
import ChatBot from "../MainComponents/ChatBot";
import ViewPDF from "../MainComponents/ViewPDF";
import TableFormat from "../MainComponents/TableFormat";
import { processStreamBuffer } from "../utils/processStreamBuffer.js";
import { useLocation, useNavigate } from "react-router-dom";

const MainPage = () => {
  const [ButtonValue, setButtonValue] = useState(0);
  const [IsTableOpen, setIsTableOpen] = useState(false);
  const [input, setInput] = useState("");
  const [QuestionsArray, setQuestionsArray] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const lastFileRef = useRef(null);  // <== this will hold the last processed file

  const handleLoadQuestions = async (file) => {
    setQuestionsArray([]); // Clear previous questions before loading new ones

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const response = await fetch("https://sbrjt-test2.hf.space/pdf", {
        method: "POST",
        body: formData,
      });
      const reader = response.body.getReader();

      await processStreamBuffer(reader, (json) =>
        setQuestionsArray((prev) => [...prev, json])
      );
    } catch (error) {
      console.error("Error loading questions:", error);
    }
  };

  useEffect(() => {
    const file = location.state?.file;

    if (!file) {
      navigate("/");
      return;
    }
    if (lastFileRef.current !== file) {
      lastFileRef.current = file;
      handleLoadQuestions(file);
    }
  }, [location.state, navigate]);

  return (
    <>
      <style>
        {`
          .scrollable {
            scrollbar-width: thin;
            scrollbar-color: #888 #222;
          }
          .scrollable::-webkit-scrollbar {
            width: 8px;
          }
          .scrollable::-webkit-scrollbar-track {
            background: #222;
            border-radius: 8px;
          }
          .scrollable::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 8px;
          }
          .scrollable::-webkit-scrollbar-thumb:hover {
            background: #aaa;
          }
        `}
      </style>

      <div
        style={{
          display: "flex",
          backgroundColor: "#080b0d",
          backgroundImage: "linear-gradient(62deg, #080b0d 15%, rgb(75, 71, 81) 100%)",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100vh",
              width: "50vw",
              borderRight: "1px solid rgba(0, 0, 0, 0.7)",
            }}
          >
            <div
              style={{
                height: "3.5rem",
                borderBottom: "1px solid grey",
                display: "flex",
                gap: "0.75rem",
                padding: "0.5rem 1rem",
                backgroundColor: "#0a0a0a",
              }}
            >
              {["Questions", "PDF", "Table"].map((label, index) => (
                <button
                  key={index}
                  style={{
                    height: "auto",
                    padding: "0.4rem 1rem",
                    borderRadius: "8px",
                    backgroundColor: "#1a1a1a",
                    color: "#fff",
                    border: "1px solid #333",
                    cursor: "pointer",
                    fontSize: "0.9rem",
                    transition: "all 0.3s ease",
                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = "#4a90e2")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "#1a1a1a")}
                  onClick={() => {
                    if (index === 2) setIsTableOpen(true);
                    else setButtonValue(index);
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            <div
              className="scrollable"
              style={{
                flex: 1,
                overflowY: "auto",
                overflowX: "hidden",
                color: "white",
              }}
            >
              {ButtonValue === 0 && (
                <Questions setInput={setInput} QuestionsArray={QuestionsArray} />
              )}
              {ButtonValue === 1 && <ViewPDF />}
            </div>
          </div>
        </div>

        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
          }}
        >
          <ChatBot input={input} setInput={setInput} />
        </div>

        <TableFormat
          isOpen={IsTableOpen}
          onClose={() => setIsTableOpen(false)}
          QuestionsArray={QuestionsArray}
        />
      </div>
    </>
  );
};

export default MainPage;
