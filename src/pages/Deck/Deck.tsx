import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Card from '../../components/Card/Card';
import Button from '../../components/UI/Button/Button';
import IconButton from '../../components/UI/IconButton/IconButton';
import { formatPokemon, formatPokemonSpecies } from '../../utilities/functions';
import dataService from '../../services/base.services';
import { FormattedPokemon, FormattedPokemonSpecies, FormattedPokemonSprites } from '../../services/interfaces';
import classes from './Deck.module.css';
import { faMars, faVenus, faMarsAndVenus, faDiamond } from '@fortawesome/free-solid-svg-icons';

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

const PokemonDeck = () => {
	const { id } = useParams<{ id: string }>();
	const history = useHistory();
	const [pokemon, setPokemon] = useState<FormattedPokemon>(initialPokemon);
	const [pokemonSpecies, setPokemonSpecies] = useState<FormattedPokemonSpecies>(initialSpecies);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [nextDisabled, setNextDisabled] = useState(false);
	const [previousDisabled, setPreviousDisabled] = useState(false);
	const [image, setImage] = useState('official');
	const [variety, setVariety] = useState('');

	useEffect(() => {
		setError('');
		setLoading(true);

		const getPokemon = async () => {
			try {
				const pokemonData = formatPokemon(await dataService.getPokemon(id));
				setPokemon(pokemonData);
				console.log({ pokemonData });
				const species = formatPokemonSpecies(await dataService.getPokemonSpecies(id));
				console.log({ species });
				setPokemonSpecies(species);
				setVariety(species?.varieties[0].name);
			} catch (error) {
				// setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		const enableButtons = (id: string) => {
			if (id === '1') {
				setPreviousDisabled(true);
			} else if (id > '1' && previousDisabled) {
				setPreviousDisabled(false);
			} else if (id >= '898') {
				setNextDisabled(true);
			} else if (id < '898' && nextDisabled) {
				setNextDisabled(false);
			}
		};

		enableButtons(id);
		getPokemon();
	}, [id, previousDisabled, nextDisabled]);

	const goToNext = () => {
		let newId = parseInt(id) + 1;
		history.push(`/pokemon/${newId}`);
	};

	const goToPrev = () => {
		let newId = parseInt(id) - 1;
		history.push(`/pokemon/${newId}`);
	};

	const changeImage = (selection: string) => {
		setImage(selection);
	};

	const changeVariety = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedVariety = event.target.value;
		setVariety(selectedVariety);
		const varietyValues = pokemonSpecies.varieties.find(variety => variety.name === selectedVariety);
		console.log(varietyValues?.img);
		setPokemon(prevState => ({
			...prevState,
			name: varietyValues?.name as string,
			img: varietyValues?.img as FormattedPokemonSprites,
		}));
	};

	return (
		<>
			<div className={classes.card_container}>
				<Card
					loading={loading}
					pokemon={pokemon}
					pokemonSpecies={pokemonSpecies}
					error={error}
					selectedImg={image}
				/>
				<div className={classes.varieties}>
					<div className={classes.icon}>
						<IconButton
							clickHandler={() => changeImage('official')}
							title="Official Artwork"
							icon={faDiamond}
							shiny={false}
							color="tomato"
						/>
					</div>
					{/* <div className={classes.icon}>
						<IconButton
							clickHandler={() => changeImage('default_3D')}
							title="Male"
							icon={faMarsAndVenus}
							shiny={false}
							color="darkmagenta"
						/>
						<IconButton
							clickHandler={() => changeImage('shiny_3D')}
							title="Shiny Male"
							icon={faMarsAndVenus}
							shiny={true}
							color="indianred"
						/>
					</div> */}
					<div className={classes.icon}>
						<IconButton
							clickHandler={() => changeImage('default_3D')}
							title="Male"
							icon={faMars}
							shiny={false}
							color="mediumblue"
						/>
						<IconButton
							clickHandler={() => changeImage('shiny_3D')}
							title="Shiny Male"
							icon={faMars}
							shiny={true}
							color="deepskyblue"
						/>
					</div>
					<div className={classes.icon}>
						<IconButton
							clickHandler={() => changeImage('female_3D')}
							title="Female"
							icon={faVenus}
							shiny={false}
							color="mediumvioletred"
						/>
						<IconButton
							clickHandler={() => changeImage('shiny_female_3D')}
							title="Shiny Female"
							icon={faVenus}
							shiny={true}
							color="deeppink"
						/>
					</div>
				</div>
			</div>

			<div className={classes.actions}>
				<Button isDisabled={previousDisabled} clickHandler={goToPrev} text="Previous" />
				<Button isDisabled={nextDisabled} clickHandler={goToNext} text="Next" />
			</div>
			<select name="varieties" id="varieties" onChange={changeVariety} value={variety}>
				{pokemonSpecies.varieties?.map(variety => (
					<option key={variety.number}>{variety.name}</option>
				))}
			</select>
		</>
	);
};

export default PokemonDeck;
