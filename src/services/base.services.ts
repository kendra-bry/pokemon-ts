import http from './http-config';
import { Pokemon, PokemonSpecies } from './interfaces';

class DataService {
	getPokemon(id: number): Promise<Pokemon> {
		return http.get(`pokemon/${id}`).then(x => x.data);
	}

	getPokemonSpecies(id: number): Promise<PokemonSpecies> {
		return http.get(`pokemon-species/${id}`).then(x => x.data);
	}
}

export default new DataService();
