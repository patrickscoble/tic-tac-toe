import React from 'react';
import '../custom.css';

export const Moves = (props) => {

	const calculateCol = (position) => {
		if (position % 3 === 0)
			return 1;

		if (position % 3 === 1)
			return 2;

		return 3;
	}

	const calculateRow = (position) => {
		if (position < 3)
			return 1;

		if (position < 6)
			return 2;

		return 3;
	}

	const moveItem = (step, move) => {
		const col = calculateCol(step.lastMove);
		const row = calculateRow(step.lastMove);

		let className = "list-group-item list-group-item-action";
		if (props.stepNumber === move)
			className += " active";

		const description = move ?
			'Go to move #' + move + ' (' + col + ', ' + row + ')' :
			'Go to game start';

		return (
			<button type="button" key={move} onClick={() => props.handleMoveClick(move)} className={className}>{description}</button>
		);
	}

	const moveList = props.history.map((step, move) => moveItem(step, move))

	return (
		<div>
			<h4>Moves</h4>
			<div className="list-group">
				{props.descending ? moveList.reverse() : moveList}
			</div>
			<button type="button" onClick={() => props.handleReverseClick()} className="btn btn-secondary btn-sm btn-toggle">Reverse Order</button>
		</div>
	)
}
