import React, { useState, useRef } from "react";
import MessageLoader from "../Loaders/MessageLoader";
import ChatBotIcon from "../assets/chatbot.png";
import { Close as CloseIcon } from "@mui/icons-material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

const ChatBot = (props) => {
  const fileInputRef = useRef(null);
  const { input, setInput } = props;
  const [messages, setMessages] = useState([]);
  const [SelectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const removeSelectedImage = () => {
    setSelectedImage(null);
    fileInputRef.current.value = null;
  };

  const handleSend = async () => {
    if (input.trim() || SelectedImage) {
      if (SelectedImage) {
        const imageMessage = {
          image: URL.createObjectURL(SelectedImage),
          sender: "user",
        };
        setMessages((prev) => [...prev, imageMessage]);
      }

      if (input.trim()) {
        const userMessage = { text: input, sender: "user" };
        setMessages((prev) => [...prev, userMessage]);
      }

      setInput("");
      setLoading(true);

      try {
        const formData = new FormData();
        if (SelectedImage) {
          formData.append("image", SelectedImage);
        }
        formData.append("text", input);
        setSelectedImage(null);

        const res = await fetch("https://sbrjt-test2.hf.space/chat", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        const botMessage = {
          text: data.response || "No response",
          sender: "bot",
        };
        setMessages((prev) => [...prev, botMessage]);
      } catch (error) {
        const errorMessage = {
          text: "Failed to get response from server.",
          sender: "bot",
        };
        setMessages((prev) => [...prev, errorMessage]);
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "50vw",
        color: "white",
        background: "linear-gradient(180deg, #000000 0%, #1a1a1a 100%)",
        display: "flex",
        flexDirection: "column",
        borderLeft: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "0.8rem",
          fontSize: "1.3rem",
          fontWeight: "500",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          backgroundColor: "#111",
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <img src={ChatBotIcon} alt="ChatBot" style={{ width: "2.5rem" }} />
        <span>Ask your doubts here</span>
      </div>

      {/* Chat Area */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
              backgroundColor: msg.sender === "user" ? "#4a90e2" : "#333",
              color: "#fff",
              padding: "0.7rem 1rem",
              borderRadius: "1rem",
              maxWidth: "70%",
              wordWrap: "break-word",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            {msg.image && (
              <img
                src={msg.image}
                alt="User upload"
                style={{
                  maxWidth: "100%",
                  borderRadius: "0.5rem",
                }}
              />
            )}
            {msg.text}
          </div>
        ))}

        {loading && (
          <div style={{ alignSelf: "flex-start" }}>
            <MessageLoader />
          </div>
        )}
      </div>

      {/* Selected Image Preview - Above Input */}
      {SelectedImage && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            padding: "1rem",
            gap: "0.5rem",
            margin: "0 1rem 1rem 1rem",
            border: "none",
            boxShadow: "none",
          }}
        >
          <div style={{ overflow: "hidden", display: "flex" }}>
            <img
              src={URL.createObjectURL(SelectedImage)}
              alt="Selected preview"
              style={{
                borderRadius: "5px",
                maxWidth: "200px",
                height: "auto",
              }}
            />
          </div>
          <div
            style={{
              background: "rgba(255,255,255,0.1)", // just the button has a subtle bg
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "0.6rem",
              cursor: "pointer",
              width: "2.5rem",
              height: "2.5rem",
            }}
            onClick={removeSelectedImage}
          >
            <CloseIcon
              style={{
                width: "1.8rem",
                height: "1.8rem",
                color: "white",
              }}
            />
          </div>
        </div>
      )}

      {/* Input Area */}
      <div
        style={{
          display: "flex",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          padding: "0.75rem 1rem 0.75rem 0.6rem",
          backgroundColor: "#0a0a0a",
        }}
      >
        <div
          style={{
            borderRadius: "50%",
            background: "rgba(255,255,255,0.1)",
            padding: "0.5rem",
            cursor: "pointer",
            marginRight: "1rem",
          }}
          onClick={handleIconClick}
        >
          <AddPhotoAlternateIcon
            style={{ width: "3rem", height: "2rem" }}
          />
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
            accept=".jpeg, .jpg, .png"
          />
        </div>
        <input
          type="text"
          value={input}
          placeholder="Type your message..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            flex: 1,
            padding: "0.6rem 1rem",
            borderRadius: "1rem",
            border: "none",
            outline: "none",
            backgroundColor: "#222",
            color: "#fff",
            fontSize: "1rem",
            marginRight: "0.5rem",
          }}
        />
        <button
          onClick={handleSend}
          disabled={loading}
          style={{
            padding: "0.6rem 1rem",
            borderRadius: "1rem",
            border: "none",
            backgroundColor: "#4a90e2",
            color: "#fff",
            fontWeight: "bold",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
