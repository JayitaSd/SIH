import React from "react";
import ChatbotIcon from "./ChatbotIcon";

const ChatMessage = ({ chat }) => {
  return (
    <div
      className={`message ${chat.sender === "model" ? "bot" : "user"}-message ${
        chat.isError ? "error" : ""
      }`}
    >
      {chat.sender === "model" && <ChatbotIcon />}
      <p className="message-text">{chat.text}</p>
    </div>
  );
};

export default ChatMessage;
