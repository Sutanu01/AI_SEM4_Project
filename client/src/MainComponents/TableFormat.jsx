import React from "react";

const TableFormat = (props) => {
  const {isOpen,onClose,QuestionsArray}=props
  if (!isOpen) return null;
  
  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <div style={headerStyle}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", margin: 0 }}>
            Question Table
          </h2>
          <button onClick={onClose} style={closeButtonStyle}>
            ✕
          </button>
        </div>

        <div style={scrollContainerStyle}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              backgroundColor: "#1e1e1e",
              tableLayout: "fixed",
            }}
          >
            <colgroup>
              <col style={{ width: "10%" }} />
              <col style={{ width: "45%" }} />
              <col style={{ width: "20%" }} />
              <col style={{ width: "25%" }} />
            </colgroup>
            <thead>
              <tr style={{ backgroundColor: "#333" }}>
                <th style={thStyle}>Q No.</th>
                <th style={thStyle}>Question</th>
                <th style={thStyle}>Unit</th>
                <th style={thStyle}>Subtopic</th>
              </tr>
            </thead>
            <tbody>
              {QuestionsArray.map((item, index) => (
                <tr key={index} style={{ borderBottom: "1px solid #444" }}>
                  <td style={tdStyle}>{index+1}</td>
                  <td style={cellWrapStyle}>{item.content}</td>
                  <td style={cellWrapStyle}>{item.unit}</td>
                  <td style={cellWrapStyle}>{item.subtopic}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Styles
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  height: "100vh",
  width: "100vw",
  backgroundColor: "rgba(0, 0, 0, 0.75)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
};

const modalStyle = {
  backgroundColor: "#121212",
  color: "white",
  borderRadius: "8px",
  padding: "1rem",
  width: "90%",
  maxWidth: "1100px",
  maxHeight: "90vh",
  boxShadow: "0 0 20px rgba(0,0,0,0.5)",
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "1rem",
};

const closeButtonStyle = {
  background: "transparent",
  border: "none",
  fontSize: "1.5rem",
  color: "#fff",
  cursor: "pointer",
};

const scrollContainerStyle = {
  overflowX: "auto",
  maxHeight: "80vh",
  overflowY: "auto",
  scrollbarColor: "#555 #222",
  scrollbarWidth: "thin",
};
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(
  `
  div::-webkit-scrollbar {
    width: 8px;
  }
`,
  styleSheet.cssRules.length
);

styleSheet.insertRule(
  `
  div::-webkit-scrollbar-track {
    background: #1a1a1a;
  }
`,
  styleSheet.cssRules.length
);

styleSheet.insertRule(
  `
  div::-webkit-scrollbar-thumb {
    background-color: #555;
    border-radius: 4px;
  }
`,
  styleSheet.cssRules.length
);

const thStyle = {
  padding: "0.75rem",
  textAlign: "left",
  borderBottom: "2px solid #555",
  fontWeight: "600",
  color: "#eee",
};

const tdStyle = {
  padding: "0.75rem",
  textAlign: "left",
  color: "#ccc",
  verticalAlign: "top",
};

const cellWrapStyle = {
  ...tdStyle,
  wordWrap: "break-word",
  whiteSpace: "pre-wrap",
};

export default TableFormat;
