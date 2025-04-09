import React from 'react';

const MessageLoader = () => {
  return (
    <div style={{
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      padding: "0.7rem 1rem",
      backgroundColor: "#333",
      borderRadius: "1rem",
      width: "fit-content",
      maxWidth: "70%",
    }}>
      <div style={{ display: "flex", gap: "4px" }}>
        <span style={dotStyle(0)}></span>
        <span style={dotStyle(1)}></span>
        <span style={dotStyle(2)}></span>
      </div>
    </div>
  );
};

const dotStyle = (index) => ({
  width: "8px",
  height: "8px",
  borderRadius: "50%",
  backgroundColor: "#ccc",
  animation: "dotFlashing 1s infinite",
  animationDelay: `${index * 0.2}s`,
});

const style = document.createElement("style");
style.innerHTML = `
@keyframes dotFlashing {
  0% { opacity: 0.2; }
  50% { opacity: 1; }
  100% { opacity: 0.2; }
}`;
document.head.appendChild(style);

export default MessageLoader;
