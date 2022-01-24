import React from 'react'
import '../custom.css'

export const Results = (props) => {

	const resultRow = (result, index) => {
		return (
			<tr key={index}>
				<td>{result.player}</td>
				<td>{result.result}</td>
				<td>{result.winningSquares}</td>
			</tr>
		)
	}

	const resultTable = props.results.map((result, index) => resultRow(result, index))

	return (
		<div>
			<h4 className="table-heading">Results</h4>
			<div>
				<button type="button" onClick={() => props.handleClearResultsClick()} className="btn btn-secondary btn-clear">Clear</button>
			</div>
			<table className="table">
				<thead className="table-header">
					<tr>
						<th>Winner</th>
						<th>Result</th>
						<th>Squares</th>
					</tr>
				</thead>
				<tbody>
					{resultTable}
				</tbody>
			</table>
		</div>
	)
}
