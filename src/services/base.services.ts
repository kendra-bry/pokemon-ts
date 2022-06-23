import http from './http-config';
import { Pokemon } from './interfaces';

class DataService {

	getPokemon(id: number): Promise<Pokemon> {
		return http.get(`pokemon/${id}`).then(x => x.data);
	}
}

export default new DataService();
