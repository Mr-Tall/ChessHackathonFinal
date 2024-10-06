import React, { useState} from 'react';
import { Chess } from 'chess.js'; // Importing chess.js for game logic
import { Chessboard } from 'react-chessboard'; // Importing react-chessboard for UI
import Chatbot from './Chatbot'; // Import the Chatbot component


const ChessboardComponent = ({ userColor }) => {
    const [game, setGame] = useState(new Chess()); // Initializing a new chess game
    const [moves, setMoves] = useState([]); // State to store the moves made
    const [fen, setFen] = useState('start'); // State to store the FEN string



    // Function to handle moves
    const handleMove = (sourceSquare, targetSquare) => {
        const move = game.move({
            from: sourceSquare,
            to: targetSquare,
            promotion: 'q' // Always promote to a queen for simplicity
        });

        if (move) {
            const newFen = game.fen();
            setFen(newFen);
            const uciMove = `${move.from}${move.to}${move.promotion ? move.promotion : ''}`;
            setMoves([...moves, move]);
            console.log('FEN:', newFen); // Log current FEN string
            console.log('Move:', move); // Log current move
            console.log('UCI Move:', uciMove); // Log move in UCI format

            const difficulty = 10; // Example difficulty value, you might have it from user input

        // Send UCI move and difficulty to backend
        fetch('http://127.0.0.1:8000/log_move', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        body: JSON.stringify({ uci: uciMove, difficulty }) // Send both UCI move and difficulty
    })
            .then(response => response.json())
            .then(data => {
                console.log('Response from backend:', data);
                const stockfishMove = data.stockfish_move;
                if (stockfishMove) {
                    // Apply Stockfish's move
                    const appliedMove = game.move({
                        from: stockfishMove.slice(0, 2),
                        to: stockfishMove.slice(2, 4),
                        promotion: stockfishMove.length > 4 ? stockfishMove[4] : undefined
                    });

                    if (appliedMove) {
                        // Update FEN after Stockfish's move
                        const updatedFen = game.fen();
                        setFen(updatedFen);

                        // Update the moves array with both user and Stockfish's moves
                        setMoves([...moves, move, appliedMove]);
                        console.log('Updated FEN after Stockfish move:', updatedFen);
                    }
                }
            })
            .catch(error => {
                console.error('Error sending move to backend:', error);
            });
        }
    };

    // Render the chess board
    return (
        <div>
            <Chessboard
                position={fen}
                onPieceDrop={handleMove} // Handle piece drops to update the game state
                boardOrientation={userColor} // The orientation of the board is controlled by userColor
            />
            {/* Pass the current FEN to the Chatbot */}
            <Chatbot currentFen={fen} />
        </div>
    );
};

export default ChessboardComponent;
