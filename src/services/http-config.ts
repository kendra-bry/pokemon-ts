import { setup } from 'axios-cache-adapter';

const http = setup({
	baseURL: 'https://pokeapi.co/api/v2',
	headers: {
		'Content-type': 'application/json',
	},
	cache: { maxAge: 15 * 60 * 1000 },
});

export default http;
