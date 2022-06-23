import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Card from '../components/Card/Card';
import dataService from '../services/base.services';
import { formatPokemon, formatPokemonSpecies } from '../utilities/functions';
import { FormattedPokemon, FormattedPokemonSpecies } from '../services/interfaces';
import { AxiosError } from 'axios';

const initialPokemon: FormattedPokemon = {
	img: '',
	name: '',
	hp_label: '',
	hp_value: '',
	order: '',
	height: '',
	weight: '',
	moves: [],
	types: [],
};

const initialSpecies: FormattedPokemonSpecies = {
	color: '',
	description: '',
	generation: '',
};

const PokemonDeck = () => {
	const { id } = useParams<{ id: string }>();
	const history = useHistory();

	const [pokemon, setPokemon] = useState<FormattedPokemon>(initialPokemon);
	const [pokemonSpecies, setPokemonSpecies] = useState<FormattedPokemonSpecies>(initialSpecies);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [pageId, setPageId] = useState(10);

	const goToNext = () => {
		let newId = parseInt(id);
		setPageId(newId++);
		history.push(`/pokemon/${pageId}`);
	};

	const goToPrev = () => {
		let newId = parseInt(id);
		setPageId(newId--);
		history.push(`/pokemon/${pageId}`);
	};

	useEffect(() => {
		setError('');
		setLoading(true);
		const getPokemon = async () => {
			try {
				const pokemonData = formatPokemon(await dataService.getPokemon(id));
				setPokemon(pokemonData);
				const species = formatPokemonSpecies(await dataService.getPokemonSpecies(id));
				setPokemonSpecies(species);
			} catch (error) {
				const err = error as AxiosError;
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};
		getPokemon();
	}, [id]);

	return (
		<>
			<Card loading={loading} pokemon={pokemon} pokemonSpecies={pokemonSpecies} error={error} />
			<div style={{ display: 'flex', alignItems: 'space-between' }}>
				<button onClick={goToPrev}>Previous</button>
				<button onClick={goToNext}>Next</button>
			</div>
		</>
	);
};

export default PokemonDeck;
