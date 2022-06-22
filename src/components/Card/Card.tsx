// import React, { useEffect } from 'react';
import { splitAndCapitalizeWords } from '../../utilities/functions';

import classes from './Card.module.css';
import Move from './Move/Move';
import Description from './Description/Description';

const pokemonData = {
	abilities: [
		{
			ability: {
				name: 'overgrow',
				url: 'https://pokeapi.co/api/v2/ability/65/',
			},
			is_hidden: false,
			slot: 1,
		},
		{
			ability: {
				name: 'chlorophyll',
				url: 'https://pokeapi.co/api/v2/ability/34/',
			},
			is_hidden: true,
			slot: 3,
		},
	],
	base_experience: 64,
	forms: [
		{
			name: 'bulbasaur',
			url: 'https://pokeapi.co/api/v2/pokemon-form/1/',
		},
	],
	height: 7,
	id: 1,
	is_default: true,
	moves: [
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
	],
	name: 'bulbasaur',
	order: 1,
	past_types: [],
	species: {
		name: 'bulbasaur',
		url: 'https://pokeapi.co/api/v2/pokemon-species/1/',
	},
	sprites: {
		back_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png',
		back_female: null,
		back_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png',
		back_shiny_female: null,
		front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
		front_female: null,
		front_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png',
		front_shiny_female: null,
		other: {
			dream_world: {
				front_default:
					'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
				front_female: null,
			},
			home: {
				front_default:
					'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/1.png',
				front_female: null,
				front_shiny:
					'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/1.png',
				front_shiny_female: null,
			},
			'official-artwork': {
				front_default:
					'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
			},
		},
	},
	stats: [
		{
			base_stat: 45,
			effort: 0,
			stat: {
				name: 'hp',
				url: 'https://pokeapi.co/api/v2/stat/1/',
			},
		},
		{
			base_stat: 49,
			effort: 0,
			stat: {
				name: 'attack',
				url: 'https://pokeapi.co/api/v2/stat/2/',
			},
		},
		{
			base_stat: 49,
			effort: 0,
			stat: {
				name: 'defense',
				url: 'https://pokeapi.co/api/v2/stat/3/',
			},
		},
		{
			base_stat: 65,
			effort: 1,
			stat: {
				name: 'special-attack',
				url: 'https://pokeapi.co/api/v2/stat/4/',
			},
		},
		{
			base_stat: 65,
			effort: 0,
			stat: {
				name: 'special-defense',
				url: 'https://pokeapi.co/api/v2/stat/5/',
			},
		},
		{
			base_stat: 45,
			effort: 0,
			stat: {
				name: 'speed',
				url: 'https://pokeapi.co/api/v2/stat/6/',
			},
		},
	],
	types: [
		{
			slot: 1,
			type: {
				name: 'grass',
				url: 'https://pokeapi.co/api/v2/type/12/',
			},
		},
		{
			slot: 2,
			type: {
				name: 'poison',
				url: 'https://pokeapi.co/api/v2/type/4/',
			},
		},
	],
	weight: 69,
};

const img = pokemonData.sprites.other['official-artwork'].front_default;
const name = splitAndCapitalizeWords(pokemonData.name);
const hp_label = pokemonData.stats[0].stat.name.toLocaleUpperCase();
const hp_value = pokemonData.stats[0].base_stat;
const order = '001';
const height = pokemonData.height;
const weight = pokemonData.weight;

const Card = () => {
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
					<span>No: </span>{order}
				</div>
				<div>
					<span>Height: </span>{height}"
				</div>
				<div>
					<span>Weight: </span>{weight} lbs
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
