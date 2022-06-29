import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Card from '../../components/Card/Card';
import IconButton from '../../components/UI/IconButton/IconButton';
import { formatPokemon, formatPokemonSpecies } from '../../utilities/functions';
import dataService from '../../services/base.services';
import { FormattedPokemon, FormattedPokemonSpecies, FormattedPokemonSprites } from '../../services/interfaces';
import { faMars, faVenus, faDiamond } from '@fortawesome/free-solid-svg-icons';
import { initialPokemon } from '../Trainer/Trainer';
import { initialSpecies } from '../Trainer/Trainer';
import { Button, Row, Col, Form } from 'react-bootstrap';

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
			<div className={'mt-4'}>
				<Card
					loading={loading}
					pokemon={pokemon}
					pokemonSpecies={pokemonSpecies}
					error={error}
					selectedImg={image}
				/>

				<Row className="d-flex justify-content-center">
					<Col xl={4} lg={5} md={6} sm={8} xs={10}>
						<Form.Group>
							<Form.Label>Variety Selection</Form.Label>
							<Form.Select size="lg" onChange={changeVariety} value={variety}>
								{pokemonSpecies.varieties?.map(variety => (
									<option key={variety.id}>{variety.name}</option>
								))}
							</Form.Select>
						</Form.Group>
					</Col>
				</Row>

				<div className={'d-flex justify-content-center my-3'}>
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

				<Row sm={4} md={8} lg={6} className={`justify-content-center`}>
					<Col>
						<Button
							variant="primary"
							onClick={goToPrev}
							disabled={previousDisabled}
							type="button"
							className="w-100">
							Previous
						</Button>
					</Col>
					<Col>
						<Button
							variant="primary"
							onClick={goToNext}
							disabled={nextDisabled}
							type="button"
							className="w-100">
							Next
						</Button>
					</Col>
				</Row>
			</div>
		</>
	);
};

export default PokemonDeck;
