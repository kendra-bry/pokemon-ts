import axios from 'axios';

const http = axios.create({
	baseURL: 'https://pokeapi.co/api/v2',
	headers: {
		'Content-type': 'application/json',
	},
});

export default http;
