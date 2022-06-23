import { splitAndCapitalizeWords } from '../../../utilities/functions';

// interface MoveProps {
// 	name: string;
// 	url: string;
// }

const moves = [
	{
		move: {
			name: 'razor-wind',
			url: 'https://pokeapi.co/api/v2/move/13/',
		},
	},
	{
		move: {
			name: 'swords-dance',
			url: 'https://pokeapi.co/api/v2/move/14/',
		},
	},
];

const Move = () => {
	return (
		<>
			<li>{splitAndCapitalizeWords(moves[0].move.name)}</li>
			<li>{splitAndCapitalizeWords(moves[1].move.name)}</li>
		</>
	);
};

export default Move;
