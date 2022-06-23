import { FC } from 'react';
import classes from './Move.module.css';

const Moves: FC<{ moves: string[] }> = ({ moves }) => {
	return (
		<ul className={classes.moves}>
			{moves.map(move => (
				<li key={move}>{move}</li>
			))}
		</ul>
	);
};

export default Moves;
