import http from './http-config';
import { Pokemon, PokemonSpecies } from './interfaces';

class DataService {
	getPokemonById(id: string): Promise<Pokemon> {
		return http.get(`pokemon/${id}`).then(x => x.data);
	}

	getPokemonSpecies(id: string): Promise<PokemonSpecies> {
		return http.get(`pokemon-species/${id}`).then(x => x.data);
	}
}

export default new DataService();
