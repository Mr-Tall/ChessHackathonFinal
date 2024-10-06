// Include the chess.js library in your HTML or script
// <script src="https://cdnjs.cloudflare.com/ajax/libs/chess.js/1.0.0/chess.min.js"></script>

const game = new Chess(); // Initialize a new chess game

// Function to convert FEN to UCI moves
function fenToUci(fen) {
  // Set the game position using FEN
  game.load(fen);

  // Get all legal moves from this position
  const moves = game.moves({ verbose: true }); // Verbose returns detailed move objects

  // Map these moves into UCI notation
  const uciMoves = moves.map(move => move.from + move.to + (move.promotion || ''));
  
  return uciMoves;
}

// Example FEN string (starting position)
const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

// Convert FEN to UCI moves
const uciMoves = fenToUci(fen);

console.log("UCI Moves from FEN:", uciMoves);
