export interface NamedAPIResource {
	name: string;
	url: string;
}

export interface Pokemon {
	id: number;
	name: string;
	base_experience: number;
	height: number;
	is_default: boolean;
	order: number;
	weight: number;
	abilities: PokemonAbility[];
	forms: NamedAPIResource[];
	game_indicies: VersionGameIndex[];
	held_items: PokemonHeldItem[];
	location_area_encounters: string;
	moves: PokemonMove[];
	past_type: PokemonTypePast[];
	sprites: PokemonSprites;
	species: NamedAPIResource;
	stats: PokemonStat[];
	types: PokemonType[];
}

export interface PokemonAbility {
	is_hidden: boolean;
	slot: number;
	ability: NamedAPIResource;
}

export interface PokemonHeldItem {
	item: NamedAPIResource;
	version_details: PokemonHeldItemVersion;
}

export interface PokemonHeldItemVersion {
	version: NamedAPIResource;
	rarity: number;
}

export interface PokemonMove {
	move: NamedAPIResource;
	version_group_details: PokemonMoveVersion[];
}

export interface PokemonMoveVersion {
	move_learn_method: NamedAPIResource;
	version_group: NamedAPIResource;
	level_learned_at: number;
}

export interface PokemonSprites {
	back_default: string;
	back_female: string;
	back_shiny: string;
	back_shiny_female: string;
	front_default: string;
	front_female: string;
	front_shiny: string;
	front_shiny_female: string;
	other: PokemonSpritesOther;
}

export interface PokemonSpritesOther {
    dream_world: PokemonSprites;
    home: PokemonSprites;
    'official-artwork': PokemonSprites;
}

export interface PokemonStat {
	stat: NamedAPIResource;
	effort: number;
	base_stat: number;
}

export interface PokemonType {
	slot: number;
	type: NamedAPIResource;
}

export interface PokemonTypePast {
	generation: NamedAPIResource;
	types: PokemonType[];
}

export interface VersionGameIndex {
	game_index: number;
	version: NamedAPIResource;
}
