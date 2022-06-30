import { FC } from 'react';
import { Alert, Button } from 'react-bootstrap';
import { winnerPics } from '../../utilities/winner-images';

const getRandomNumber = () => {
	let min = 0;
	let max = Math.floor(winnerPics.length - 1);
	return Math.ceil(Math.random() * (max - min) + min);
};

interface WinnerProps {
	show: boolean;
	handleClick: () => void;
}

const Winner: FC<WinnerProps> = ({ show, handleClick }) => {
	const index = getRandomNumber();
	let message =
		winnerPics[index].name === 'Ash and Pikachu'
			? `${winnerPics[index].name} are so proud!`
			: `${winnerPics[index].name} is so proud!`;

	return (
		<>
			<Alert show={show} variant="success" className="text-center">
				<Alert.Heading>You did it!</Alert.Heading>
				<img src={winnerPics[index].path} alt="" height="200" />
				<p className="mt-3">{message}</p>
				<hr />
				<div className="d-flex justify-content-center">
					<Button onClick={handleClick} variant="outline-success">
						Start New Set
					</Button>
				</div>
			</Alert>
		</>
	);
};

export default Winner;
