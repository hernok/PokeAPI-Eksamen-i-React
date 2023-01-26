import axios from 'axios';

const url = 'https://pokeapi.co/api/v2';
const query = {
	pokemon: 'pokemon'
};
//Funksjon for å fetche pokemon fra search
const FetchPokemon = async (pokemon) => {
	return axios.get(`${url}/${query.pokemon}/${pokemon}`).catch((err) => {
		console.log(err);
	});
};
export default FetchPokemon;
