import React, { useState } from "react";
import Questions from "../MainComponents/Questions";
import ChatBot from "../MainComponents/ChatBot";
import ViewPDF from "../MainComponents/ViewPDF";
import TableFormat from "../MainComponents/TableFormat";

const MainPage = () => {
  const [ButtonValue, setButtonValue] = useState(0);
  const [IsTableOpen, setIsTableOpen] = useState(false);
  const [input, setInput] = useState("");
  return (
    <>
      {" "}
      <style>
        {`
      /* For Webkit-based browsers */
.scrollable {
  scrollbar-width: thin;             /* For Firefox */
  scrollbar-color: #888 #222;        /* Thumb and track for Firefox */
}

.scrollable::-webkit-scrollbar {
  width: 8px;
}

.scrollable::-webkit-scrollbar-track {
  background: #222;                  /* Dark background for the track */
  border-radius: 8px;
}

.scrollable::-webkit-scrollbar-thumb {
  background: #888;                  /* Thumb color */
  border-radius: 8px;
}

.scrollable::-webkit-scrollbar-thumb:hover {
  background: #aaa;                  /* Hover effect */
}
`}
      </style>
      <div
        style={{
          display: "flex",
          backgroundColor: "#080b0d",
          backgroundImage:
            "linear-gradient(62deg, #080b0d 15%, rgb(75, 71, 81) 100%)",
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
                  onMouseOver={(e) =>
                    (e.target.style.backgroundColor = "#4a90e2")
                  }
                  onMouseOut={(e) =>
                    (e.target.style.backgroundColor = "#1a1a1a")
                  }
                  onClick={() => {
                    if (index == 2) setIsTableOpen(true);
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
              {ButtonValue === 0 && <Questions setInput={setInput} />}
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
        />
      </div>
    </>
  );
};

export default MainPage;
