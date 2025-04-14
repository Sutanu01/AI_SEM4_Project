import React, { useState, useEffect } from 'react';

const DifficultyBlock = ({ difficulty }) => {
  const [color, setColor] = useState("white");

  useEffect(() => {
    switch (difficulty?.toLowerCase()) {
      case "easy":
        setColor("#4CAF50");  // Green
        break;
      case "medium":
        setColor("#FFC107");  // Amber / Yellow
        break;
      case "hard":
        setColor("#F44336");  // Red
        break;
      default:
        setColor("grey");
        break;
    }
  }, [difficulty]);

  return (
    <div
      style={{
        backgroundColor: "black",
        color: color,
        border: `2px solid ${color}`,
        padding: "0.4rem ",
        borderRadius: "1rem",
        fontWeight: "bold",
        textTransform: "uppercase",
        fontSize: "0.6rem",
        display: "inline-block",
        minWidth: "60px",
        textAlign: "center",
        cursor: "default",
        transition: "all 0.3s ease",
        boxShadow: `0 0 0px ${color}`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 0 15px ${color}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = `0 0 0px ${color}`;
      }}
    >
      {difficulty}
    </div>
  );
};

export default DifficultyBlock;
