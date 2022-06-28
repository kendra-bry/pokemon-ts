import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Card from '../../components/Card/Card';
import Button from '../../components/UI/Button/Button';
import IconButton from '../../components/UI/IconButton/IconButton';
import { formatPokemon, formatPokemonSpecies } from '../../utilities/functions';
import dataService from '../../services/base.services';
import { FormattedPokemon, FormattedPokemonSpecies, FormattedPokemonSprites } from '../../services/interfaces';
import classes from './Deck.module.css';
import { faMars, faVenus, faDiamond } from '@fortawesome/free-solid-svg-icons';

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
		setImage('official');

		const getPokemonById = async () => {
			try {
				const pokemonData = formatPokemon(await dataService.getPokemonById(id));
				setPokemon(pokemonData);
				const species = await formatPokemonSpecies(await dataService.getPokemonSpecies(id));
				setPokemonSpecies(species);
				setVariety(species?.varieties[0].name);
			} catch (error) {
				console.log('getPokemonById: ', error);
				// setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		const enableButtons = (id: number) => {
			if (id === 1) {
				setPreviousDisabled(true);
				setNextDisabled(false);
			} else if (id > 1 && previousDisabled) {
				setPreviousDisabled(false);
				setNextDisabled(false);
			} else if (id >= 898) {
				setNextDisabled(true);
				setPreviousDisabled(false);
			} else if (id < 898 && nextDisabled) {
				setNextDisabled(false);
				setPreviousDisabled(false);
			}
		};

		enableButtons(+id);
		getPokemonById();
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
		setPokemon(prevState => ({
			...prevState,
			name: varietyValues?.name as string,
			img: varietyValues?.img as FormattedPokemonSprites,
		}));
	};

	return (
		<>
			<div className={classes.page_container}>
				<Card
					loading={loading}
					pokemon={pokemon}
					pokemonSpecies={pokemonSpecies}
					error={error}
					selectedImg={image}
				/>

				<div className={classes.selection}>
					<label htmlFor="varieties" style={{ margin: '10px' }}>
						Variety Selection
					</label>
					<select name="varieties" id="varieties" onChange={changeVariety} value={variety}>
						{pokemonSpecies.varieties?.map(variety => (
							<option key={variety.id}>{variety.name}</option>
						))}
					</select>
				</div>

				<div className={classes.varieties}>
					<IconButton
						clickHandler={() => changeImage('official')}
						title="Official Artwork"
						icon={faDiamond}
						shiny={false}
						color="tomato"
					/>
					{pokemon.img.default_3D && (
						<IconButton
							clickHandler={() => changeImage('default_3D')}
							title="Type I"
							icon={faMars}
							shiny={false}
							color="mediumblue"
						/>
					)}
					{pokemon.img.shiny_3D && (
						<IconButton
							clickHandler={() => changeImage('shiny_3D')}
							title="Type I Shiny"
							icon={faMars}
							shiny={true}
							color="deepskyblue"
						/>
					)}

					{pokemon.img.female_3D && (
						<IconButton
							clickHandler={() => changeImage('female_3D')}
							title="Type II"
							icon={faVenus}
							shiny={false}
							color="mediumvioletred"
						/>
					)}
					{pokemon.img.shiny_female_3D && (
						<IconButton
							clickHandler={() => changeImage('shiny_female_3D')}
							title="Type II Shiny"
							icon={faVenus}
							shiny={true}
							color="deeppink"
						/>
					)}
				</div>

				<div className={classes.actions}>
					<Button isDisabled={previousDisabled} clickHandler={goToPrev} text="Previous" />
					<Button isDisabled={nextDisabled} clickHandler={goToNext} text="Next" />
				</div>
			</div>
		</>
	);
};

export default PokemonDeck;
