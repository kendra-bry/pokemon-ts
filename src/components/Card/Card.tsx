import React, { useEffect, useState } from 'react';
import { splitAndCapitalizeWords } from '../../utilities/functions';
import dataService from '../../services/base.services';
import classes from './Card.module.css';
import Move from './Move/Move';
import Description from './Description/Description';
import { Pokemon } from '../../services/interfaces';

const Card = () => {
	const [pokemon, setPokemon] = useState<Pokemon>();

	useEffect(() => {
		const getPokemon = async () => {
			try {
				const response = await dataService.getPokemon(1);
				setPokemon(response);
				console.log({ response });
			} catch (error) {
				console.log(error);
			}
		};

		getPokemon();
	}, []);

	const img = pokemon?.sprites.other['official-artwork'].front_default;
	const name = pokemon?.name ? splitAndCapitalizeWords(pokemon.name) : '';
	const hp_label = pokemon?.stats[0].stat.name.toLocaleUpperCase();
	const hp_value = pokemon?.stats[0].base_stat;
	const order = pokemon?.order.toString();
	const height = pokemon?.height;
	const weight = pokemon?.weight;

	return (
		<div className={classes.card}>
			<div className={classes.header}>
				{name}
				<div className={classes.hp}>
					<span>{hp_label}</span>
					{hp_value}
				</div>
			</div>
			<div className={classes.image}>
				<img src={img} alt="Pokemon" />
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
			</div>
			<ul className={classes.moves}>
				<Move />
			</ul>
			<Description />
		</div>
	);
};

export default Card;
