import { useRef } from "react";

const ChatForm = ({ chatHistory, setChatHistory, generateResponse }) => {
  const inputRef = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (userMessage) {
      inputRef.current.value = "";
      setChatHistory((prev) => [
        ...prev,
        { sender: "user", text: userMessage },
      ]);

      
      generateResponse([...chatHistory, { sender: "user", text: userMessage }]);
    }
  };

  return (
    <div>
      <form className="chat-form" onSubmit={handleFormSubmit}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Message..."
          className="message-input"
          required
        />
        <button className="material-symbols-rounded">arrow_upward</button>
      </form>
    </div>
  );
};

export default ChatForm;
