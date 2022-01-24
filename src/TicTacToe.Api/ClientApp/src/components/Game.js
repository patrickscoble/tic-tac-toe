import React, { useState } from 'react';
import '../custom.css';
import { getAIMove } from '../services/MoveService';
import { Board } from './Board';
import { Moves } from './Moves';
import { Results } from './Results';

export const Game = () => {

	const [history, setHistory] = useState([
		{
			squares: Array(9).fill(null),
			lastMove: 0
		}
	]);

	const [stepNumber, setStepNumber] = useState(0);
	const [xIsPlayer, setXIsPlayer] = useState(true);
	const [descending, setDescending] = useState(false);
	const [results, setResults] = useState([]);

	const calculateWinner = (squares) => {
		const lines = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6]
		];
		for (let i = 0; i < lines.length; i++) {
			const [a, b, c] = lines[i];
			if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
				return lines[i];
			}
		}
		return null;
	}

	const calculateGameOver = (squares) => {
		for (let i = 0; i < squares.length; i++) {
			if (squares[i] === null) {
				return false;
			}
		}
		return true;
	}

	const handleStepClick = (cell) => {
		const slicedHistory = history.slice(0, stepNumber + 1);
		const current = slicedHistory[slicedHistory.length - 1];
		const squares = current.squares.slice();

		if (calculateWinner(squares) || squares[cell]) {
			return;
		}

		squares[cell] = xIsPlayer ? 'X' : 'O';

		const winner = calculateWinner(squares);
		const gameOver = calculateGameOver(squares);

		if (winner || gameOver) {
			let player = null;
			let result = null;
			let winningSquares = null;

			if (winner) {
				player = squares[winner[0]];
				result = (player === 'X' && xIsPlayer) || (player === 'O' && !xIsPlayer) ? 'Win' : 'Loss';
				winningSquares = winner[0] + ',' + winner[1] + ',' + winner[2];
			} else if (gameOver) {
				player = 'NA';
				result = 'Draw';
				winningSquares = 'NA';
			}

			setHistory(slicedHistory.concat([
				{
					squares: squares,
					lastMove: cell
				}
			]));

			setStepNumber(slicedHistory.length);
			setResults(results.concat({
				player: player,
				result: result,
				winningSquares: winningSquares
			}));

			return;
		}

		const request = async () => {
			await getAIMove({ squares: squares, xIsPlayer: xIsPlayer })
				.then(response => squares[response] = xIsPlayer ? 'O' : 'X');

			const winner = calculateWinner(squares);

			if (winner) {
				let player = squares[winner[0]];
				let result = (player === 'X' && xIsPlayer) || (player === 'O' && !xIsPlayer) ? 'Win' : 'Loss';
				let winningSquares = winner[0] + ',' + winner[1] + ',' + winner[2];

				setResults(results.concat(
					{
						player: player,
						result: result,
						winningSquares: winningSquares
					}
				));
			}

			setHistory(slicedHistory.concat([
				{
					squares: squares,
					lastMove: cell
				}
			]));
			setStepNumber(slicedHistory.length);
		}

		request();
	}

	const handleChangePlayerClick = () => {
		setHistory([
			{
				squares: Array(9).fill(null),
				lastMove: 0
			}
		]);
		setStepNumber(0);
		setXIsPlayer(!xIsPlayer);
	}

	const current = history[stepNumber];
	const winner = calculateWinner(current.squares);
	const currentPlayer = xIsPlayer ? 'X' : 'O';

	let player = null;

	if (winner) {
		player = current.squares[winner[0]]
	}

	return (
		<div className="container">
			<div className="game">
				<div className="game-board">
					<h4>Player {currentPlayer}</h4>
					<Board
						squares={current.squares}
						winner={winner}
						player={player}
						xIsPlayer={xIsPlayer}
						onClick={(cell) => handleStepClick(cell)}
					/>
					<button type="button" onClick={() => handleChangePlayerClick()} className="btn btn-secondary btn-sm btn-toggle">Change Player</button>
				</div>
				<div className="game-info">
					<Moves
						history={history}
						stepNumber={stepNumber}
						handleMoveClick={(step => setStepNumber(step))}
						descending={descending}
						handleReverseClick={() => setDescending(!descending)}
					/>
					</div>				
			</div>
			<Results
				results={results}
				handleClearResultsClick={() => setResults([])}
			/>
		</div>
	)
}
