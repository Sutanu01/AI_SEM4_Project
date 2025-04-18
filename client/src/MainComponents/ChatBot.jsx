import React, { useState } from "react";
import MessageLoader from "../Loaders/MessageLoader";
import ChatBotIcon from "../assets/chatbot.png";
const ChatBot = (props) => {
	const [messages, setMessages] = useState([]);
	const { input, setInput } = props;
	const [loading, setLoading] = useState(false);

	const handleSend = async () => {
		if (input.trim()) {
			const userMessage = { text: input, sender: "user" };
			setMessages((prev) => [...prev, userMessage]);
			setInput("");
			setLoading(true);

			try {
				const formData = new FormData();
				formData.append("text", input); // Sending input as 'text'

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
					color: "white",
					display: "flex",
					justifyContent: "start",
					alignItems: "center",
					gap: "1rem",
				}}
			>
				<img src={ChatBotIcon} alt="ChatBot" style={{ width: "2.5rem" }} />
				<span>Ask your doubts here</span>
			</div>

			{/* Chat area */}
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
						}}
					>
						{msg.text}
					</div>
				))}

				{/* Loader when waiting for bot response */}
				{loading && (
					<div style={{ alignSelf: "flex-start" }}>
						<MessageLoader />
					</div>
				)}
			</div>

			{/* Input */}
			<div
				style={{
					display: "flex",
					borderTop: "1px solid rgba(255,255,255,0.1)",
					padding: "0.75rem 1rem",
					backgroundColor: "#0a0a0a",
				}}
			>
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
