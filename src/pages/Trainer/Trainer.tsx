import { useState } from 'react';
import dataService from '../../services/base.services';
import Card from '../../components/Card/Card';
import page_classes from '../Page.module.css';
import classes from './Trainer.module.css';
import { FormikHelpers } from 'formik';
import { FormattedPokemon, FormattedPokemonSpecies } from '../../services/interfaces';
import { formatPokemon, formatPokemonSpecies } from '../../utilities/functions';

import Settings from '../../components/Form/Settings/Settings';
import { SettingsValues } from '../../components/Form/Settings/Settings';
import { initialSettingsValues } from '../../components/Form/Settings/Settings';

import Quiz from '../../components/Form/Quiz/Quiz';
import { QuizValues } from '../../components/Form/Quiz/Quiz';

import { Row, Col } from 'react-bootstrap';

export const initialPokemon: FormattedPokemon = {
	img: { official: '' },
	name: '',
	hp_label: '',
	hp_value: '',
	order: '',
	height: '',
	weight: '',
	moves: [],
	types: [],
};

export const initialSpecies: FormattedPokemonSpecies = {
	color: '',
	description: '',
	generation: '',
	has_gender_differences: false,
	varieties: [],
};

const Trainer = () => {
	const [solution, setSolution] = useState('');
	const [error, setError] = useState('');
	const [showSettingsForm, setShowSettingsForm] = useState(true);
	const [settings, setSettings] = useState<SettingsValues>(initialSettingsValues);
	const [pokemon, setPokemon] = useState<FormattedPokemon>(initialPokemon);
	const [species, setSpecies] = useState<FormattedPokemonSpecies>(initialSpecies);
	const [showCard, setShowCard] = useState(true);
	const [loading, setLoading] = useState(false);

	const fetchPokemon = async (values: SettingsValues) => {
		setLoading(true);
		try {
			const id = getRandomIdByGeneration(values.generation);
			const pokemonData = formatPokemon(await dataService.getPokemonById(id));
			setPokemon(pokemonData);
			// setShowSettingsForm(false);
			const pokemonSpecies = await formatPokemonSpecies(await dataService.getPokemonSpecies(id), true);
			setSpecies(pokemonSpecies);
			setSolution(pokemonData.name.toLowerCase());
			// setShowCard(true);
			setLoading(false);
		} catch (error) {}
	};

	const getRandomIdByGeneration = (gen: string) => {
		let min = 0;
		let max = 0;
		switch (gen) {
			case 'I':
				min = 0;
				max = 151;
				break;
			case 'II':
				min = 152;
				max = 251;
				break;
			case 'III':
				min = 252;
				max = 386;
				break;
			case 'IV':
				min = 387;
				max = 493;
				break;
			case 'V':
				min = 494;
				max = 649;
				break;
			case 'VI':
				min = 650;
				max = 721;
				break;
			case 'VII':
				min = 722;
				max = 809;
				break;
			case 'VIII':
				min = 810;
				max = 898;
				break;
			case 'All':
			default:
				min = 1;
				max = 898;
		}
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.ceil(Math.random() * (max - min) + min).toString();
	};

	const handleStart = async (values: SettingsValues, actions: FormikHelpers<SettingsValues>) => {
		try {
			setSettings(values);
			await fetchPokemon(values);
		} catch (error) {}
	};

	const handleGuess = (values: QuizValues, actions: FormikHelpers<QuizValues>) => {
		const { guess } = values;
		if (guess.toLowerCase() === solution) {
			console.log('Congratulations!');
			handleReset();
			actions.resetForm();
		} else {
			console.log('Incorrect!');
		}
	};

	const handleReset = () => {
		// setShowSettingsForm(true);
		// setShowCard(false);
		setSolution('');
	};

	return (
		<>
			<div className={'text-center mt-4'}>
				<h1>Trainer Gym</h1>
				<div>Welcome to the Pokemon Trainer Gym. Here you can put your Pokemon knowledge to the test.</div>
			</div>
			<Row className={'mt-3d-flex justify-content-center'}>
				<Col className="">
					<Card
						loading={loading}
						pokemon={pokemon}
						pokemonSpecies={species}
						error={error}
						selectedImg="official"
						showName={false}
						difficulty={settings.difficulty}
					/>
				</Col>
			</Row>
			<div className={'w-50 my-3 mx-auto'}>
				<Settings submitFn={handleStart} />
				<Quiz submitFn={handleGuess} resetFn={handleReset} refreshFn={fetchPokemon} settings={settings} />
			</div>
		</>
	);
};

export default Trainer;
