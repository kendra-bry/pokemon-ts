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

import dataService from '../services/base.services';

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

export const formatPokemonSpecies = async (pokemonSpecies: PokemonSpecies, removeName: boolean = false) => {
	try {
		const formattedPokemonSpecies: FormattedPokemonSpecies = {
			color: pokemonSpecies?.color.name,
			description: formatDescription(pokemonSpecies.flavor_text_entries, pokemonSpecies.name, removeName) ?? '',
			generation: pokemonSpecies?.generation ? formatGeneration(pokemonSpecies.generation.name) : '',
			has_gender_differences: pokemonSpecies?.has_gender_differences,
			varieties: await formatVarieties(pokemonSpecies?.varieties),
		};
		return formattedPokemonSpecies;
	} catch (error) {
		console.log('formatPokemonSpecies: ', error);
		throw error;
	}
};

export const formatVarieties = async (varieties: PokemonSpeciesVariety[]) => {
	try {
		const formattedVarieties: FormattedPokemonVariety[] = [];
		for (let variety of varieties) {
			const varietyNumArr = variety.pokemon.url.split('/');
			const id = varietyNumArr[varietyNumArr.length - 2];
			formattedVarieties.push({
				is_default: variety.is_default,
				name: splitAndCapitalizeWords(variety.pokemon.name),
				id,
				img: await createPokemonSprites(id),
			});
		}
		return formattedVarieties;
	} catch (error) {
		console.log('formatVarieties: ', error);
		throw error;
	}
};

export const formatPokemonSprites = (pokemonSprites: PokemonSprites) => {
	const formattedPokemonSprites: FormattedPokemonSprites = {
		official: pokemonSprites?.other['official-artwork'].front_default ?? defaultImg,
		default_3D: pokemonSprites?.other.home.front_default ?? null,
		female_3D: pokemonSprites?.other.home.front_female ?? null,
		shiny_3D: pokemonSprites?.other.home.front_shiny ?? null,
		shiny_female_3D: pokemonSprites?.other.home.front_shiny_female ?? null,
	};
	return formattedPokemonSprites;
};

export const createPokemonSprites = async (id: string) => {
	try {
		const pokemon = await dataService.getPokemonById(id);
		return formatPokemonSprites(pokemon.sprites);
	} catch (error) {
		console.log('CreatePokemonSprites: ', error);
		throw error;
	}
};

export const formatDescription = (descriptions: FlavorText[], name: string, removeName: boolean) => {
	let englishDescription = descriptions.find(description => description.language.name === 'en');
	let description = englishDescription?.flavor_text.replace('\f', ' ');
	return removeName ? description?.replace(new RegExp(name, 'gi'), '_________') : description;
};

export const formatGeneration = (generation: string) => generation.split('-')[1].toUpperCase();

export const formatTypes = (types: PokemonType[]) => types.map(type => type.type.name);
