import { useEffect, useState } from 'react';

import Moves from './Move/Move';
import Description from './Description/Description';

import dataService from '../../services/base.services';
import { formatPokemon, formatPokemonSpecies, capitalizeWord } from '../../utilities/functions';
import { FormattedPokemon, FormattedPokemonSpecies } from '../../services/interfaces';

import classes from './Card.module.css';
import colors from '../../utilities/colors.module.css';

import { typesIcons } from '../../utilities/type-images';

import spinner from '../../resources/img/spinner.png';
import { AxiosError } from 'axios';

const Card = () => {
	const [pokemon, setPokemon] = useState<FormattedPokemon>();
	const [pokemonSpecies, setPokemonSpecies] = useState<FormattedPokemonSpecies>();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const pokeNumber = 212;

	useEffect(() => {
		setError('');
		setLoading(true);
		const getPokemon = async () => {
			try {
				const pokemonData = formatPokemon(await dataService.getPokemon(pokeNumber));
				setPokemon(pokemonData);
				const species = formatPokemonSpecies(await dataService.getPokemonSpecies(pokeNumber));
				setPokemonSpecies(species);
			} catch (error) {
				const err = error as AxiosError;
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		getPokemon();
	}, []);

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

	return (
		<div className={`${classes.card} ${colors[color]}`}>
			<div className={classes.header}>
				{name}
				<div className={classes.generation}>Gen. {generation}</div>
				<div className={classes.hp}>
					<span>{hp_label}</span>
					{hp_value}
				</div>
			</div>
			<div className={classes.image}>
				{error && <div className={classes.error}>Oh no! {error}.</div>}
				{loading && <img className={classes.spinner} src={spinner} alt={name} />}
				{!loading && <img src={img} alt={name} />}
			</div>
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
			{moves.length > 0 && <Moves moves={moves} />}
			{description && <Description description={description} />}
		</div>
	);
};

export default Card;
