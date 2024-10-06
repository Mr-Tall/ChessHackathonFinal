import os
import subprocess
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import chess
import logging
from dotenv import load_dotenv
import openai


app = FastAPI()
load_dotenv()

# Get the API key from the environment
openai.api_key = os.getenv("OPENAI_API_KEY")

# Allow CORS for your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to your frontend's URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



app = FastAPI()

# Load environment variables from the .env file
load_dotenv()

# Allow CORS for your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to your frontend's URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")
print(openai.api_key)



class ChatMessage(BaseModel):
    message: str
    fen: str

@app.post("/chat")
async def chat_with_openai(chat_message: ChatMessage):
    # Handle the message and FEN here
    return {"response": f"Received message: {chat_message.message} with FEN: {chat_message.fen}"}

# Move model with UCI and difficulty level
class Move(BaseModel):
    uci: str
    difficulty: int  # Include difficulty level in the request body

STOCKFISH_PATH = "C:\\Users\\19563\\OneDrive\\Documents\\Hackathon\\teamwin\\backend\\stockfish\\stockfish-windows-x86-64-avx2.exe"

board = chess.Board()

def get_stockfish_best_move(fen: str, difficulty: int) -> str:
    try:
        # Start the Stockfish engine as a subprocess
        process = subprocess.Popen(STOCKFISH_PATH, stdin=subprocess.PIPE, stdout=subprocess.PIPE, text=True)

        # Send UCI initialization commands
        process.stdin.write("uci\n")
        process.stdin.flush()

        # Set difficulty based on user input
        process.stdin.write(f"setoption name Skill Level value {difficulty}\n")
        process.stdin.flush()

        # Set up the board with the provided FEN
        process.stdin.write(f"position fen {fen}\n")
        process.stdin.flush()

        # Ask Stockfish for the best move
        process.stdin.write("go movetime 1000\n")  # 1 second to calculate the move
        process.stdin.flush()

        # Read Stockfish output
        best_move = None
        while True:
            output = process.stdout.readline().strip()
            if output.startswith("bestmove"):
                best_move = output.split()[1]
                break

        # Terminate Stockfish process
        process.stdin.write("quit\n")
        process.stdin.flush()
        process.terminate()

        return best_move
    except Exception as e:
        logging.error(f"Error interacting with Stockfish: {e}")
        raise HTTPException(status_code=500, detail="Error communicating with Stockfish")

@app.post("/reset_board")
async def reset_board():
    global board
    board = chess.Board()  # Reset the global chess board
    logging.info("Board has been reset")
    return {"message": "Board reset successfully"}




@app.post("/log_move")
async def log_move(move: Move):
    global board  # Use the global board state
    logging.info(f"Received UCI move: {move.uci} with difficulty: {move.difficulty}")
    print(f"Received UCI move: {move.uci}")

    # Apply user's move to the board
    try:
        board.push_uci(move.uci)  # Update the board with the user's move
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid move")

    # Check if the user's move has ended the game
    if board.is_game_over():
        result = board.result()
        return {
            "message": "Game over",
            "result": result,  # Display result, e.g., 1-0 (White wins), 0-1 (Black wins), 1/2-1/2 (Draw)
        }

    # Get the current board state in FEN format after the user's move
    current_fen = board.fen()

    # Get Stockfish's best move based on the current board state and difficulty
    stockfish_move = get_stockfish_best_move(current_fen, move.difficulty)

    # Apply Stockfish's move to the board
    board.push_uci(stockfish_move)

    # Check if Stockfish's move has ended the game
    if board.is_game_over():
        result = board.result()
        return {
            "user_move": move.uci,
            "stockfish_move": stockfish_move,
            "message": "Game over",
            "result": result,  # Display result of the game
        }



    # Return both the user's move and Stockfish's response
    return {
        "user_move": move.uci,
        "stockfish_move": stockfish_move,
        "message": "Move logged successfully"
    }