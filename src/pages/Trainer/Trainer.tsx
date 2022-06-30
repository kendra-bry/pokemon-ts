import { useState, useEffect, useCallback } from 'react';
import dataService from '../../services/base.services';
import Card from '../../components/Card/Card';
import Winner from '../../components/Winner/Winner';
import { FormikHelpers } from 'formik';
import { FormattedPokemon, FormattedPokemonSpecies } from '../../services/interfaces';
import { formatPokemon, formatPokemonSpecies } from '../../utilities/functions';

import Settings from '../../components/Form/Settings/Settings';
import { SettingsValues } from '../../components/Form/Settings/Settings';
import { initialSettingsValues } from '../../components/Form/Settings/Settings';

import Quiz from '../../components/Form/Quiz/Quiz';
import { QuizValues } from '../../components/Form/Quiz/Quiz';

import { Row, Col, Alert } from 'react-bootstrap';

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
	const [settings, setSettings] = useState<SettingsValues>(initialSettingsValues);
	const [pokemon, setPokemon] = useState<FormattedPokemon>(initialPokemon);
	const [species, setSpecies] = useState<FormattedPokemonSpecies>(initialSpecies);

	const [hint, setHint] = useState('');
	const [hintCount, setHintCount] = useState(0);
	const [guessCounter, setGuessCounter] = useState(0);
	// const [timer, setTimer] = useState(settings.timer);
	const [successCounter, setSuccessCounter] = useState(0);
	const [settingsSubmitted, setSettingsSubmitted] = useState(false);

	const [loading, setLoading] = useState(false);
	const [showHint, setShowHint] = useState(false);
	const [showHintWarning, setShowHintWarning] = useState(false);
	const [showCard, setShowCard] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);
	const [showFailure, setShowFailure] = useState(false);
	const [showSettingsForm, setShowSettingsForm] = useState(true);

	const fetchPokemon = useCallback(async (values: SettingsValues) => {
		setShowCard(true);
		setLoading(true);
		setShowSettingsForm(false);
		hideAlerts();
		resetHints();
		try {
			const id = getRandomIdByGeneration(values.generation);
			const pokemonData = formatPokemon(await dataService.getPokemonById(id));
			setPokemon(pokemonData);
			// console.log(pokemonData.name);
			const pokemonSpecies = await formatPokemonSpecies(await dataService.getPokemonSpecies(id), true);
			setSpecies(pokemonSpecies);
			setSolution(pokemonData.name.toLowerCase());
			setLoading(false);
		} catch (error) {
			setError('Error');
		}
	}, []);

	useEffect(() => {
		if (settingsSubmitted) {
			if (successCounter === settings.cardLimit) {
				setShowSuccess(true);
				setShowCard(false);
				resetHints();
			} else {
				fetchPokemon(settings);
			}
		}
	}, [successCounter, settingsSubmitted, fetchPokemon, settings]);

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
			setSettingsSubmitted(true);
			setSuccessCounter(0);
			setGuessCounter(0);
		} catch (error) {}
	};

	const handleGuess = (values: QuizValues, actions: FormikHelpers<QuizValues>) => {
		hideAlerts();
		const { guess } = values;
		if (guess.toLowerCase() === solution) {
			actions.resetForm();
			setSuccessCounter(prevState => ++prevState);
			setGuessCounter(0);
		} else {
			setGuessCounter(prevState => ++prevState);
			setShowFailure(true);
			actions.resetForm();
		}
	};

	const handleHint = () => setHintCount(prevState => ++prevState);

	const addLetterToCenter = (hintArr: string[], solutionArr: string[]) => {
		let middleOfArrIndex = Math.floor((hintArr.length - 1) / 2);
		hintArr.splice(middleOfArrIndex, 1, solutionArr[middleOfArrIndex]);
	};

	const addLettersToBeginningAndEnd = (
		hintArr: string[],
		solutionArr: string[],
		startHalfIndex: number,
		endHalfIndex: number
	) => {
		hintArr.splice(startHalfIndex, 1, solutionArr[startHalfIndex]);
		let secondHalfIndex = solutionArr.length - endHalfIndex;
		hintArr.splice(secondHalfIndex, 1, solutionArr[secondHalfIndex]);
	};

	useEffect(() => {

			const firstHint = () => {
				let hint: string[] = [];
				let solutionArr = solution.split('');
				solutionArr.forEach((letter, i) => {
					if (i === 0) {
						hint.push(letter.toUpperCase());
					} else if (letter === ' ') {
						hint.push(' ');
					} else if (i === solutionArr.length - 1) {
						if (solutionArr.length < 5) {
							hint.push('_');
						} else {
							hint.push(letter);
						}
					} else {
						hint.push('_');
					}
				});
				setHint(hint.join(''));
			};

			const secondHint = () => {
				let solutionArr = solution.split('');
				let hintArr = hint.split('');
				if (solutionArr.length <= 4) {
					let index = solutionArr.length - 1;
					hintArr.splice(index, 1, solutionArr[index]);
				} else if (solutionArr.length <= 6) {
					addLetterToCenter(hintArr, solutionArr);
				} else {
					addLettersToBeginningAndEnd(hintArr, solutionArr, 2, 3);
				}
				setHint(hintArr.join(''));
			};

			const thirdHint = () => {
				let solutionArr = solution.split('');
				let hintArr = hint.split('');
				if (solutionArr.length <= 6) {
					let secondFromLastIndex = solutionArr.length - 2;
					hintArr.splice(secondFromLastIndex, 1, solutionArr[secondFromLastIndex]);
				} else if (solutionArr.length <= 8) {
					addLetterToCenter(hintArr, solutionArr);
				} else {
					addLetterToCenter(hintArr, solutionArr);
				}
				setHint(hintArr.join(''));
			};

		if (hintCount === 1) {
			setShowHint(true);
			firstHint();
		} else if (hintCount === 2) {
			secondHint();
		} else if (hintCount === 3) {
			thirdHint();
		} else if (hintCount > 3) {
			setShowHintWarning(true);
		}
	}, [hintCount, hint, solution]);

	const handleReset = () => {
		setShowSuccess(false);
		setShowCard(false);
		setShowSettingsForm(true);
		hideAlerts();
		resetHints();
		setSolution('');
		setSettingsSubmitted(false);
	};

	const hideAlerts = () => {
		setShowFailure(false);
	};

	const resetHints = () => {
		setHint('');
		setShowHint(false);
		setShowHintWarning(false);
		setHintCount(0);
	};

	return (
		<div className={'d-flex flex-column justify-content-center pb-3 pt-2'}>
			<div className={'text-center'}>
				<h1>Trainer Gym</h1>
				<p className="lead fw-normal">
					Welcome to the Pokemon Trainer Gym. Here you can put your Pokemon knowledge to the test.
				</p>
			</div>
			{showSuccess && <Winner show={showSuccess} handleClick={handleReset} />}
			{showSettingsForm && (
				<Row className="justify-content-center">
					<Col lg={6} md={8} sm={10}>
						<Settings submitFn={handleStart} />
					</Col>
				</Row>
			)}
			<Row className={'justify-content-center'}>
				<Col xs={10} sm={8} md={6} lg={5} xl={4}>
					{showCard && (
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
					)}
				</Col>
				<Col sm={12} md={6} className={'d-flex flex-column justify-content-end my-2'}>
					<div>
						{showHintWarning && (
							<Alert variant="danger" onClose={() => setShowHintWarning(false)} dismissible>
								No remaining hints.
							</Alert>
						)}
						{showHint && <Alert variant="info">Hint: {hint}</Alert>}
						{showFailure && <Alert variant="danger">Incorrect. Try again.</Alert>}
						{showCard && (
							<Quiz
								submitFn={handleGuess}
								resetFn={handleReset}
								hintFn={handleHint}
								refreshFn={fetchPokemon}
								settings={settings}
								guessCounter={guessCounter}
								successCounter={successCounter}
							/>
						)}
					</div>
				</Col>
			</Row>
		</div>
	);
};

export default Trainer;
