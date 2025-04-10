import React, { useRef, useState } from "react";
import PDFicon from "../assets/pdf.png";
import GitHubIcon from "../assets/github-mark-white.png";
import botIcon from "../assets/bot.png";
import {useNavigate} from "react-router-dom"
import Loader1 from "../Loaders/Loader1";

const Home = () => {
  const fileInputRef = useRef();
  const [selectedFile, setSelectedFile] = useState(null);
  const [Waiting, setWaiting] = useState(false)
  const navigate=useNavigate()
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };
  const handleSubmit = async () => {
    if (selectedFile) {
      setWaiting(true);
      //MODEL
        setWaiting(false);
        navigate('/learning', { state: { file: selectedFile } });
    }
  };
  return (
    Waiting?<Loader1/>:
    <div
  style={{
    backgroundColor: "#080b0d",
    backgroundImage: "linear-gradient(62deg, #080b0d 15%,rgb(75, 71, 81) 100%)",
    minHeight: "100vh",
    width: "100%",
    overflowX: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    position: "relative",
  }}
>

      {/* Socials */}
      <div
        style={{
          height: "auto",
          width:"100%",
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          paddingRight: "1rem",
          position: "absolute",
          top: "1rem",
        }}
      >
        <a
          href="https://github.com/Sutanu01/AI_SEM4_Project"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={GitHubIcon} alt="github" style={{ width: "2rem" ,padding:"0rem 1rem"}} />
        </a>
      </div>

      {/* Heading */}
      <div
        style={{
          fontWeight: "bolder",
          fontSize: "min(2.3rem, 5vw)",
          width: "90%",
          maxWidth: "600px",
          textAlign: "center",
          marginBottom: "3rem",
        }}
      >
        Understand any Question and Topic through our personalized{" "}
        <span
          style={{
            color: "rgb(249, 248, 189)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          ChatBot
          <img src={botIcon} alt="Bot Icon" style={{ width: "3rem" }} />
        </span>
      </div>

      {/* PDF Upload */}
      <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        style={{
          border: "2px dashed white",
          padding: "2rem",
          borderRadius: "10px",
          textAlign: "center",
          width: "300px",
          cursor: selectedFile ? "default" : "pointer",
          height: "90px",
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          marginBottom: "1rem",
          marginTop: "2rem",
        }}
      >
        {selectedFile ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <img src={PDFicon} alt="PDF Icon" style={{ width: "3rem" }} />
            <p style={{ marginTop: "0.5rem", wordBreak: "break-word" }}>
              {selectedFile.name}
            </p>
          </div>
        ) : (
          <>
            <p style={{ marginBottom: "2rem" }}>📄 Upload your PDF here</p>
            <p style={{ fontSize: "0.9rem", color: "lightgray" }}>
              Click or drag & drop to upload
            </p>
          </>
        )}
        <input
          type="file"
          accept="application/pdf"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </div>

      {/* Submit Button */}
      {selectedFile && (
        <button
          onClick={handleSubmit}
          style={{
            padding: "0.5rem 1.5rem",
            borderRadius: "5px",
            backgroundColor: "rgb(249, 248, 189)",
            color: "#080b0d",
            fontWeight: "bold",
            border: "none",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#f0efbd")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "rgb(249, 248, 189)")}
        >
          Submit
        </button>
      )}
    </div>
  );
};

export default Home;
