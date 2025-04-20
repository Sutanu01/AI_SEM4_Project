import React from "react";
import "katex/dist/katex.min.css";
import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

const ChatBlock = ({ msg }) => {
  return (
    <div
      style={{
        alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
        backgroundColor: msg.sender === "user" ? "#4a90e2" : "#333",
        color: "#fff",
        padding: "0.7rem 1rem",
        borderRadius: "1rem",
        maxWidth: "70%",
        wordBreak: "break-word",
        overflowWrap: "anywhere",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      {msg.image && (
        <img
          src={msg.image}
          alt={msg.alt || "User uploaded content"}
          style={{
            maxWidth: "100%",
            borderRadius: "0.5rem",
          }}
        />
      )}
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          p: ({ node, ...props }) => <p style={{ wordBreak: "break-word", whiteSpace: "pre-wrap" }} {...props} />,
          ol: ({ node, ...props }) => (
            <ol
              style={{
                paddingLeft: "1.2rem",
                margin: 0,
              }}
              {...props}
            />
          ),
          li: ({ node, ...props }) => (
            <li
              style={{
                marginBottom: "0.5rem",
              }}
              {...props}
            />
          ),
          code: ({ node, inline, className, children, ...props }) =>
            !inline ? (
              <pre
                style={{
                  overflowX: "auto",
                  background: "#222",
                  padding: "0.7rem",
                  borderRadius: "0.5rem",
                  whiteSpace: "pre-wrap",
                }}
              >
                <code>{children}</code>
              </pre>
            ) : (
              <code
                style={{
                  background: "#444",
                  padding: "0.1rem 0.3rem",
                  borderRadius: "0.3rem",
                }}
              >
                {children}
              </code>
            )
        }}
      >
        {msg.text}
      </ReactMarkdown>
    </div>
  );
};

export default ChatBlock;
