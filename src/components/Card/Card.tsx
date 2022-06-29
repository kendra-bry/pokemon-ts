import { FC } from 'react';
import Moves from './Move/Move';
import Description from './Description/Description';

import { FormattedPokemon, FormattedPokemonSpecies } from '../../services/interfaces';

import classes from './Card.module.css';
import spinner from '../../resources/img/spinner.png';

import { capitalizeWord } from '../../utilities/functions';
import colors from '../../utilities/colors-gradient.module.css';
import { typesIcons } from '../../utilities/type-images';

import { Row, Col } from 'react-bootstrap';

interface CardProps {
	loading: boolean;
	pokemon: FormattedPokemon;
	pokemonSpecies: FormattedPokemonSpecies;
	error: string;
	selectedImg?: string;
	showName?: boolean;
	difficulty?: string;
}

const Card: FC<CardProps> = ({
	loading,
	pokemon,
	pokemonSpecies,
	error,
	selectedImg,
	showName = true,
	difficulty = null,
}) => {
	const img = pokemon?.img;
	const name = pokemon?.name;
	const hp_label = pokemon?.hp_label;
	const hp_value = pokemon?.hp_value;
	const order = pokemon?.order;
	const height = pokemon?.height;
	const weight = pokemon?.weight;
	const moves = pokemon?.moves ?? [];
	const description = pokemonSpecies?.description ?? '';
	const color = pokemonSpecies?.color ?? '';
	const generation = pokemonSpecies?.generation;
	const types = pokemon?.types;

	const showImage = !loading && ((difficulty && difficulty === 'Easy') || !difficulty);
	const showMoves = !loading && ((difficulty && (difficulty === 'Easy' || difficulty === 'Moderate')) || !difficulty);
	const showHeaderSpace = loading || (!loading && !showImage);

	return (
		<Row className="d-flex justify-content-center my-3">
			<Col xl={4} lg={5} md={6} sm={8} xs={10}>
				<div className="shadow">
					<div className={`${classes.card} ${colors[color]}`}>
						{showHeaderSpace && <div className={classes.loading_space}></div>}
						{showImage && (
							<div className={classes.header}>
								{showName && name}
								<div className={classes.generation}>Gen. {generation}</div>
								<div className={classes.hp}>
									<span>{hp_label}</span>
									{hp_value}
								</div>
							</div>
						)}

						<div className={classes.image}>
							{error && <div className={classes.error}>Oh no! {error}.</div>}
							{loading && <img className={classes.spinner} src={spinner} alt={name} />}
							{showImage && <img src={img[selectedImg as keyof typeof img]} alt={name} />}
						</div>

						{showMoves && (
							<div className={classes.size}>
								<div>
									<span>No: </span>
									{order}
								</div>
								<div>
									<span>Height: </span>
									{height}"
								</div>
								<div>
									<span>Weight: </span>
									{weight} lbs
								</div>
								<div>
									{types?.map(type => (
										<img
											key={type}
											src={typesIcons[type as keyof typeof typesIcons]}
											alt={type}
											height="18"
											width="18"
											title={capitalizeWord(type)}
										/>
									))}
								</div>
							</div>
						)}

						{showMoves && moves.length > 0 && <Moves moves={moves} />}
						{!loading && description && <Description description={description} />}
					</div>
				</div>
			</Col>
		</Row>
	);
};

export default Card;
