export interface APIResource {
	url: string;
}

export interface Description {
	description: string;
	language: NamedAPIResource;
}

export interface FlavorText {
	flavor_text: string;
	language: NamedAPIResource;
	version: NamedAPIResource;
}

export interface Genus {
	genus: string;
	language: NamedAPIResource;
}

export interface Name {
	name: string;
	language: NamedAPIResource;
}

export interface NamedAPIResource {
	name: string;
	url: string;
}

export interface PalParkEncounterArea {
	base_score: number;
	rate: number;
	area: NamedAPIResource;
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

export interface PokemonSpecies {
	id: number;
	name: string;
	order: number;
	gender_rate: number;
	capture_rate: number;
	base_happiness: number;
	is_baby: boolean;
	is_legendary: boolean;
	is_mythical: boolean;
	hatch_counter: number;
	has_gender_differences: boolean;
	forms_switchabe: boolean;
	growth_rate: NamedAPIResource;
	pokedex_numbers: PokemonSpeciesDexEntry[];
	egg_groups: NamedAPIResource[];
	color: NamedAPIResource;
	shape: NamedAPIResource;
	evolves_from_species: NamedAPIResource;
	evolution_chain: APIResource;
	habitat: NamedAPIResource;
	generation: NamedAPIResource;
	names: Name[];
	pal_park_encounters: PalParkEncounterArea[];
	flavor_text_entries: FlavorText[];
	form_descriptions: Description[];
	genera: Genus[];
	varieties: PokemonSpeciesVariety[];
}

export interface PokemonSpeciesDexEntry {
	entry_number: number;
	pokedex: NamedAPIResource;
}

export interface PokemonSpeciesVariety {
	is_default: boolean;
	pokemon: NamedAPIResource;
}

export interface PokemonSprites extends PokemonSpritesShinyFront {
	back_default: string;
	back_female: string;
	back_shiny: string;
	back_shiny_female: string;
	other: PokemonSpritesOther;
}

export interface PokemonSpritesOther {
	dream_world: PokemonSpritesFront;
	home: PokemonSpritesShinyFront;
	'official-artwork': PokemonSpritesDefault;
}
export interface PokemonSpritesDefault {
	front_default: string;
}
export interface PokemonSpritesFront extends PokemonSpritesDefault {
	front_female: string;
}
export interface PokemonSpritesShinyFront extends PokemonSpritesFront {
	front_shiny: string;
	front_shiny_female: string;
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

/* ========================================================= */

export interface FormattedPokemon {
	img: FormattedPokemonSprites;
	name: string;
	hp_label: string;
	hp_value: string;
	order: string;
	height: string;
	weight: string;
	moves: string[];
	types: string[];
}

export interface FormattedPokemonSpecies {
	color: string;
	description: string;
	generation: string;
	has_gender_differences: boolean;
	varieties: FormattedPokemonVariety[];
}

export interface FormattedPokemonVariety {
	id: string;
	is_default: boolean;
	name: string;
	img: FormattedPokemonSprites;
}

export interface FormattedPokemonSprites {
	official: string;
	default_3D?: string;
	female_3D?: string;
	shiny_3D?: string;
	shiny_female_3D?: string;
}
