import React from 'react';

export const Square = (props) => {
	return (	
		<button type="button" onClick={props.onClick} className={props.className}>{props.value}</button>
	)
}
