import React, { useEffect, useState } from 'react';
import ChessboardComponent from './ChessboardComponent';
import Chatbot from './Chatbot';

const Beginner = () => {
  const [fen, setFen] = useState('start'); // FEN string of the current board

  // Function to reset the board in the backend
  const resetBoard = () => {
    fetch('http://127.0.0.1:8000/reset_board', {
      method: 'POST',
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.message);
        setFen('start'); // Reset FEN to starting position in frontend
      })
      .catch(error => {
        console.error('Error resetting the board:', error);
      });
  };

  // useEffect will call resetBoard when the component is mounted (page refresh)
  useEffect(() => {
    resetBoard(); // Automatically reset the board on page load
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '20px' }}>
      {/* Chessboard Section */}
      <div style={{ marginRight: '50px', textAlign: 'center' }}>
        <h1 style={{ marginTop: '0px', paddingBottom: '20px', fontSize: '36px' }}>
          Beginner Chess Game
        </h1>
        {/* Pass the setFen function to capture FEN updates from ChessboardComponent */}
        <ChessboardComponent userColor="white" onFenChange={setFen} />
      </div>

      {/* Chatbot Section */}
      <div style={{ width: '300px', height: '500px', border: '1px solid #ccc', borderRadius: '10px', padding: '10px', backgroundColor: '#f9f9f9' }}>
        <h2>Chatbot</h2>
        {/* Pass the current FEN to the Chatbot */}
        <Chatbot currentFen={fen} />
      </div>
    </div>
  );
};

export default Beginner;
