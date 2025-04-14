import React, { useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import EastIcon from "@mui/icons-material/East";
import DifficultyBlock from "./DifficultyBlock";
const QuestionBlock = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  const { question_number, question, unit, subtopic, setInput,difficulty } = props;

  return (
    <div
      style={{
        backgroundColor: "rgb(70, 70, 70)",
        display: "flex",
        width: "700px",
        flexDirection: "column",
        border: "1px solid black",
        borderRadius: "1rem",
        margin: "1rem 1rem 0rem 1rem",
        padding: "1rem",
        color: "white",
        transition: "all 0.3s ease",
        wordBreak: "break-word",
      }}
    >
      <div
        style={{
          fontSize: "1.2rem",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "start",
        }}
      >
        <span
          style={{
            width: "7%",
            color: "rgb(237, 243, 113)",
          }}
        >
          {question_number}
        </span>
        <span style={{ width: "85%" }}>{question}</span>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"2rem",marginRight:"1rem"}}>
        <DifficultyBlock difficulty={difficulty}/>
        <span
          style={{
            marginLeft: "1rem",
            backgroundColor: "grey",
            padding: "0rem 0.5rem",
            borderRadius: "10rem",
            marginBottom: "1rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => {
            setInput(question);
          }}
        >
          <EastIcon />
        </span>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          cursor: "pointer",
          marginTop: "0.5rem",
        }}
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </div>

      {showDetails && (
        <div
          style={{ color: "rgba(255, 255, 255, 0.80)", marginTop: "0.5rem" }}
        >
          <div>{unit}</div>
          <div
            style={{
              fontSize: "0.85rem",
              display: "flex",
              flexWrap: "wrap",
              marginTop: "0.3rem",
            }}
          >
            <div
              style={{
                color: "rgb(255,255,255)",
                marginRight: "0.7rem",
              }}
            >
              Topic:
            </div>
            <div style={{ flex: 1 }}>{subtopic}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionBlock;
