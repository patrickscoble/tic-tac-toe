import React from 'react';
import { Square } from './Square';

export const Board = (props) => {

	const renderSquare = (cell, row, col, className) => {
		return (
			<Square
				key={`${row}, ${col}`}
				onClick={() => props.onClick(cell)}
				className={className}
				value={props.squares[cell]}
			/>
		)
	}

	const renderGrid = (size) => {
		let grid = [];
		let cell = 0;

		const winner = props.winner;
		const player = props.player;
		const xIsPlayer = props.xIsPlayer;

		for (let row = 0; row < size; row++) {
			let children = [];

			for (let col = 0; col < size; col++) {
				let className = "square";
				if (winner && (cell === winner[0] || cell === winner[1] || cell === winner[2])) {
					if ((player === 'X' && xIsPlayer) || (player === 'O' && !xIsPlayer)) {
						className += " highlightWinner";
					}
					else {
						className += " highlightLoser";
					}
				}

				children.push(renderSquare(cell, row, col, className));
				cell++;
			}
			grid.push(<div key={row} className="board-row">{children}</div>);
		}
		return grid;
	}

	return (
		<div>
			{renderGrid(3)}
		</div>
	)
}
