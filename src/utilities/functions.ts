import {
	FlavorText,
	FormattedPokemon,
	FormattedPokemonSpecies,
	FormattedPokemonSprites,
	FormattedPokemonVariety,
	Pokemon,
	PokemonMove,
	PokemonSpecies,
	PokemonSpeciesVariety,
	PokemonSprites,
	PokemonType,
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
		img: formatPokemonSprites(pokemon?.sprites),
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
		has_gender_differences: pokemonSpecies?.has_gender_differences,
		varieties: formatVarieties(pokemonSpecies?.varieties),
	};
	return formattedPokemonSpecies;
};

export const formatVarieties = (varieties: PokemonSpeciesVariety[]) => {
	const formattedVarieties = varieties.map(variety => {
		const varietyNumArr = variety.pokemon.url.split('/');
		const number = varietyNumArr[varietyNumArr.length - 2];
		return {
			is_default: variety.is_default,
			name: splitAndCapitalizeWords(variety.pokemon.name),
			number,
			img: createPokemonSprites(number),
		};
	});
	return formattedVarieties;
};

export const formatPokemonSprites = (pokemonSprites: PokemonSprites): FormattedPokemonSprites => {
	const formattedPokemonSprites: FormattedPokemonSprites = {
		official: pokemonSprites?.other['official-artwork'].front_default ?? defaultImg,
		default_3D: pokemonSprites?.other.home.front_default ?? defaultImg,
		female_3D: pokemonSprites?.other.home.front_female ?? defaultImg,
		shiny_3D: pokemonSprites?.other.home.front_shiny ?? defaultImg,
		shiny_female_3D: pokemonSprites?.other.home.front_shiny_female ?? defaultImg,
	};
	return formattedPokemonSprites;
};

export const createPokemonSprites = (number: string): FormattedPokemonSprites => {
	const sprites: FormattedPokemonSprites = {
		official: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${number}.png` ?? defaultImg,
		default_3D: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${number}.png` ?? defaultImg,
		female_3D: defaultImg,
		shiny_3D: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${number}.png` ?? defaultImg,
		shiny_female_3D: defaultImg,
	};
	return sprites;
};

export const formatDescription = (descriptions: FlavorText[]) => {
	let englishDescription = descriptions.find(description => description.language.name === 'en');
	return englishDescription?.flavor_text.replace('\f', ' ') ?? '';
};

export const formatGeneration = (generation: string) => generation.split('-')[1].toUpperCase();

export const formatTypes = (types: PokemonType[]) => types.map(type => type.type.name);
