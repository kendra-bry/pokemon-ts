import {
	Pokemon,
	FormattedPokemon,
	PokemonMove,
	PokemonSpecies,
	PokemonType,
	FormattedPokemonSpecies,
	FlavorText,
} from '../services/interfaces';

import defaultImg from '../resources/img/pokeball.png';

export const splitAndCapitalizeWords = (word: string): string => {
	let string = '';

	if (word.includes('-')) {
		string = word
			.split('-')
			.map(string => capitalizeWord(string))
			.join(' ');
	} else {
		string = capitalizeWord(word);
	}
	return string;
};

export const capitalizeWord = (word: string): string => `${word.split('')[0].toUpperCase()}${word.substring(1)}`;

export const formatPokemon = (pokemon: Pokemon): FormattedPokemon => {
	const formattedPokemon: FormattedPokemon = {
		img: pokemon?.sprites.other['official-artwork'].front_default ?? defaultImg,
		name: pokemon?.name ? splitAndCapitalizeWords(pokemon.name) : '',
		hp_label: pokemon?.stats[0].stat.name.toLocaleUpperCase() ?? '',
		hp_value: pokemon?.stats[0].base_stat.toString() ?? '',
		order: pokemon?.id.toString() ?? '',
		height: pokemon?.height.toString() ?? '',
		weight: pokemon?.weight.toString() ?? '',
		moves: pokemon?.moves ? formatMoves(pokemon.moves) : [],
		types: pokemon?.types ? formatTypes(pokemon.types) : [],
	};

	return formattedPokemon;
};

export const formatMoves = (pokemonMoves: PokemonMove[]): string[] =>
	pokemonMoves.map(pokemonMove => splitAndCapitalizeWords(pokemonMove.move.name)).splice(0, 2);

export const formatPokemonSpecies = (pokemonSpecies: PokemonSpecies): FormattedPokemonSpecies => {
	const formattedPokemonSpecies: FormattedPokemonSpecies = {
		color: pokemonSpecies?.color.name,
		description: formatDescription(pokemonSpecies.flavor_text_entries),
		generation: pokemonSpecies?.generation ? formatGeneration(pokemonSpecies.generation.name) : '',
	};
	return formattedPokemonSpecies;
};

export const formatDescription = (descriptions: FlavorText[]) => {
	let englishDescription = descriptions.find(description => description.language.name === 'en');
	return englishDescription?.flavor_text.replace('\f', ' ') ?? '';
};

export const formatGeneration = (generation: string) => generation.split('-')[1].toUpperCase();

export const formatTypes = (types: PokemonType[]) => types.map(type => type.type.name);
