import React, { useState } from 'react';


const Chatbot = ({ currentFen }) => {
  const [messages, setMessages] = useState([]);  // Store messages
  const [input, setInput] = useState('');  // Store user input

  // Function to send the user message
  const handleSendMessage = () => {
    if (input.trim() === '') return;  // Prevent sending empty messages

    const userMessage = { sender: 'user', text: input };
    setMessages([...messages, userMessage]);  // Add the user's message to the chatbox

    // Prepare request data for backend (include message and FEN)
    const requestData = {
      message: input,   // The user's message
      fen: currentFen   // The current FEN from the chessboard
    };

    console.log("Sending to backend:", requestData);  // Debugging to check FEN being sent

    // Clear the input field
    setInput('');

    // Send message and FEN to the backend
    fetch('http://127.0.0.1:8000/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),  // Send both the message and FEN
    })
      .then((response) => response.json())
      .then((data) => {
        // Add chatbot response to the chatbox
        const botMessage = { sender: 'bot', text: data.response };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      })
      .catch((error) => {
        console.error('Error sending message to backend:', error);
      });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
      {/* Title */}
      <h1 style={{ textAlign: 'center', color: 'black' }}>Chess AI Assistant</h1>

      {/* Chatbox displaying messages */}
      <div style={{ flexGrow: 1, overflowY: 'auto', marginBottom: '10px', padding: '10px', border: '1px solid #ccc', backgroundColor: '#fff' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left', margin: '5px 0', color: 'black' }}>
            <strong>{msg.sender === 'user' ? 'You: ' : 'Bot: '}</strong>{msg.text}
          </div>
        ))}
      </div>

      {/* Input field */}
      <div style={{ display: 'flex' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}  // Capture user input
          placeholder="Type your message..."
          style={{ flexGrow: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc', color: 'black' }}  // Set input text to black
        />
        <button
          onClick={handleSendMessage}  // Send message on button click
          style={{ padding: '10px', marginLeft: '10px', borderRadius: '5px', backgroundColor: '#007bff', color: 'white' }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;

