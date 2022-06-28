import { useState } from 'react';
import dataService from '../../services/base.services';
import { Formik, FormikHelpers, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import classes from './Trainer.module.css';
import Card from '../../components/Card/Card';
import { FormattedPokemon, FormattedPokemonSpecies } from '../../services/interfaces';
import { formatPokemon, formatPokemonSpecies } from '../../utilities/functions';

interface GuessValues {
	guess: string;
}

interface QuizValues {
	difficulty: string;
	generation: string;
}

const GuessSchema = Yup.object().shape({
	guess: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
});

const QuizSchema = Yup.object().shape({
	difficulty: Yup.string().required('Required'),
	generation: Yup.string().required('Required'),
});

const initialPokemon: FormattedPokemon = {
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

const initialSpecies: FormattedPokemonSpecies = {
	color: '',
	description: '',
	generation: '',
	has_gender_differences: false,
	varieties: [],
};

const initialGuessValues: GuessValues = { guess: '' };

const initialQuizValues: QuizValues = { difficulty: 'Easy', generation: 'All' };

const Trainer = () => {
	const [solution, setSolution] = useState('');
	const [error, setError] = useState('');
	const [showQuizForm, setShowQuizForm] = useState(true);
	const [quizValues, setQuizValues] = useState<QuizValues>(initialQuizValues);
	const [pokemon, setPokemon] = useState<FormattedPokemon>(initialPokemon);
	const [species, setSpecies] = useState<FormattedPokemonSpecies>(initialSpecies);
	const [showCard, setShowCard] = useState(false);
	const [loading, setLoading] = useState(false);

	const fetchPokemon = async (values: QuizValues) => {
		setLoading(true);
		try {
			const id = getRandomIdByGeneration(values.generation);
			const pokemonData = formatPokemon(await dataService.getPokemonById(id));
			setPokemon(pokemonData);
			setShowQuizForm(false);
			const pokemonSpecies = await formatPokemonSpecies(await dataService.getPokemonSpecies(id), true);
			setSpecies(pokemonSpecies);
			setSolution(pokemonData.name.toLowerCase());
			setShowCard(true);
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

	const handleStart = async (values: QuizValues, actions: FormikHelpers<QuizValues>) => {
		try {
			setQuizValues(values);
			await fetchPokemon(values);
		} catch (error) {}
	};

	const handleGuess = (values: GuessValues, actions: FormikHelpers<GuessValues>) => {
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
		setShowQuizForm(true);
		setShowCard(false);
		setSolution('');
	};

	const generations = ['All', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];

	const difficulties = ['Easy', 'Moderate', 'Difficult'];

	return (
		<>
			<h1>Trainer Gym</h1>
			<div>Welcome to the Pokemon Trainer Gym. Here you can put your Pokemon knowledge to the test.</div>
			{showQuizForm && (
				<Formik
					initialValues={initialQuizValues}
					onSubmit={handleStart}
					validationSchema={QuizSchema}
					enableReinitialize={true}>
					{() => (
						<Form className={classes.form}>
							<div className={classes.fields}>
								<div className={classes.input}>
									<label htmlFor="difficulty">Difficulty</label>
									<Field
										id="difficulty"
										name="difficulty"
										placeholder="Pokemon difficulty"
										as="select">
										{difficulties.map(gen => (
											<option key={gen} value={gen}>
												{gen}
											</option>
										))}
									</Field>
									<ErrorMessage
										name="difficulty"
										render={msg => <div className={classes.error}>{msg}</div>}
									/>
								</div>
								<div className={classes.input}>
									<label htmlFor="generation">Generation(s)</label>
									<Field
										id="generation"
										name="generation"
										placeholder="Pokemon generation"
										as="select">
										{generations.map(gen => (
											<option key={gen} value={gen}>
												{gen}
											</option>
										))}
									</Field>
									<ErrorMessage
										name="generation"
										render={msg => <div className={classes.error}>{msg}</div>}
									/>
								</div>
							</div>
							<button type="submit" className={classes.start}>
								Start
							</button>
						</Form>
					)}
				</Formik>
			)}

			{showCard && (
				<>
					<Card
						loading={loading}
						pokemon={pokemon}
						pokemonSpecies={species}
						error={error}
						selectedImg="official"
						showName={false}
					/>
					<Formik
						initialValues={initialGuessValues}
						onSubmit={handleGuess}
						validationSchema={GuessSchema}
						enableReinitialize={true}>
						{() => (
							<Form className={classes.form}>
								<div className={classes.input}>
									<label htmlFor="guess">Name that Pokemon!</label>
									<Field id="guess" name="guess" placeholder="Pokemon Guess" />
									<ErrorMessage
										name="guess"
										render={msg => <div className={classes.error}>{msg}</div>}
									/>
									<button type="submit" className={classes.submit}>
										Submit
									</button>
								</div>
								<button type="button" className={classes.reset} onClick={handleReset}>
									Start Over
								</button>
								<button
									type="button"
									className={classes.new}
									onClick={async () => await fetchPokemon(quizValues)}>
									New Pokemon
								</button>
							</Form>
						)}
					</Formik>
				</>
			)}
		</>
	);
};

export default Trainer;
