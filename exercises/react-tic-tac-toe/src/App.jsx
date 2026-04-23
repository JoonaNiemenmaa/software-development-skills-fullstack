import { useState } from "react";
import "./board.css";

const State = {
	EMPTY: "-",
	O: "O",
	X: "X",
};

const Turn = {
	O: "O",
	X: "X",
};

const GameState = {
	ONGOING: "ONGOING",
	X_WON: "X_WON",
	O_WON: "O_WON",
};

const Square = ({ onClick, state }) => {
	return <button onClick={onClick} className="square">{state}</button>
};

const Board = () => {

	const [gameState, setGameState] = useState(GameState.ONGOING);
	const [turn, setTurn] = useState(Turn.O);

	const [board, setBoard] = useState([
		[State.EMPTY, State.EMPTY, State.EMPTY],
		[State.EMPTY, State.EMPTY, State.EMPTY],
		[State.EMPTY, State.EMPTY, State.EMPTY],
	]);

	const checkBoard = (newBoard) => {

		for (const row of newBoard) {
			if (row[0] === row[1] && row[0] === row[2]) {
				switch (row[0]) {
					case State.X:
						return GameState.X_WON;
					case State.O:
						return GameState.O_WON;
					case State.EMPTY:
						return GameState.ONGOING;
				};
			}
		}

		for (var i = 0; i < newBoard.length; i++) {
			if (newBoard[0][i] === newBoard[1][i] && newBoard[1][i] === newBoard[2][i]) {
				switch (newBoard[0][i]) {
					case State.X:
						return GameState.X_WON;
					case State.O:
						return GameState.O_WON;
					case State.EMPTY:
						return GameState.ONGOING;
				};
			}
		}

		if (newBoard[0][0] === newBoard[1][1] && newBoard[0][0] === newBoard[2][2]) {
			switch (newBoard[0][0]) {
				case State.X:
					return GameState.X_WON;
				case State.O:
					return GameState.O_WON;
				case State.EMPTY:
					return GameState.ONGOING;
			};
		}

		if (newBoard[0][2] === newBoard[1][1] && newBoard[0][2] === newBoard[2][0]) {
			switch (newBoard[0][2]) {
				case State.X:
					return GameState.X_WON;
				case State.O:
					return GameState.O_WON;
				case State.EMPTY:
					return GameState.ONGOING;
			};
		}

		return GameState.ONGOING;
	};

	const handleClick = (currentState, row, square) => () => {
		if (currentState === State.EMPTY && gameState === GameState.ONGOING) {
			const newBoard = board.map((states, rowId) =>
				states.map((state, squareId) => (row === rowId && square === squareId) ? turn : state)
			);
			setBoard(newBoard);
			setTurn(turn === Turn.X ? Turn.O : Turn.X);

			const check = checkBoard(newBoard);
			console.log(check);
			setGameState(check);
		}
	}

	const rows = board.map((states, rowId) => {
		return (
			<div key={rowId} className="row">
				{states.map((state, squareId) => <Square onClick={handleClick(state, rowId, squareId)} key={squareId} state={state} />)}
			</div>
		);
	})

	return (
		<div className="board">
			{(() => {
				switch (gameState) {
					case GameState.ONGOING:
						return <p>Game still ongoing!</p>
					case GameState.O_WON:
						return <p>O won the game!</p>
					case GameState.X_WON:
						return <p>X won the game!</p>
				};
			})()
			}
			{rows}
		</div>
	);
};

const App = () => {
	return (
		<>
			<h1>Here you can play tic-tac-toe!</h1>
			<Board />
		</>
	);
};

export default App;
