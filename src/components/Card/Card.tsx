import { FC } from 'react';
import Moves from './Move/Move';
import Description from './Description/Description';

import { FormattedPokemon, FormattedPokemonSpecies } from '../../services/interfaces';

import classes from './Card.module.css';
import spinner from '../../resources/img/spinner.png';

import { capitalizeWord } from '../../utilities/functions';
import colors from '../../utilities/colors-gradient.module.css';
import { typesIcons } from '../../utilities/type-images';

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

	console.log({ pokemon });

	if (difficulty && difficulty === 'Difficult') {
		
	}

	return (
		<div className={`${classes.card} ${colors[color]}`}>
			{loading && <div className={classes.loading_space}></div>}
			{!loading && (
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
				{!loading && <img src={img[selectedImg as keyof typeof img]} alt={name} />}
			</div>

			{!loading && (
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
			{!loading && moves.length > 0 && <Moves moves={moves} />}
			{!loading && description && <Description description={description} />}
		</div>
	);
};

export default Card;
