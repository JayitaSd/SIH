import ChatbotIcon from "./Components/ChatbotIcon";
import ChatMessage from "./Components/ChatMessage";
import ChatForm from "./Components/ChatForm";
import { useEffect, useRef, useState } from "react";

const App = () => {
  const [chatHistory, setChatHistory] = useState([
    {
      sender: "model",
      text: "ନମସ୍କାର! ଆପଣଙ୍କୁ କିପରି ସହାୟତା କରିପାରିବି?",
      isError: false,
    },
  ]);
  const chatBodyRef = useRef();

  
 
  const generateResponse = async (prevHistory) => {
    if (!prevHistory.length) return;

    const lastUserMessage = prevHistory[prevHistory.length - 1].text;

 
    setChatHistory((prev) => [
      ...prev,
      { sender: "model", text: "Thinking...", isError: false },
    ]);

    try {
      const backendUrl = `${import.meta.env.VITE_API_URL}/chat`;
      const response = await fetch(backendUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: lastUserMessage }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Something went wrong");

      setChatHistory((prev) =>
        prev.map((msg) =>
          msg.text === "Thinking..."
            ? { ...msg, text: data.reply, isError: false }
            : msg
        )
      );
    } catch (error) {
      setChatHistory((prev) =>
        prev.map((msg) =>
          msg.text === "Thinking..."
            ? { ...msg, text: error.message, isError: true }
            : msg
        )
      );
    }
  };

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatHistory]);

  return (
    <div className="container">
      <div className="chatbot-popup">
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon />
            <h2 className="logo-text">Chatbot</h2>
          </div>
          <button className="material-symbols-rounded">
            keyboard_arrow_down
          </button>
        </div>

        <div ref={chatBodyRef} className="chat-body">
          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
        </div>

        <div className="chat-footer">
          <ChatForm
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            generateResponse={generateResponse} 
          />
        </div>
      </div>
    </div>
  );
};

export default App;
