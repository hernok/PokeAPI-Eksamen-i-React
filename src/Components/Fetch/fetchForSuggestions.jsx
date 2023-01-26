import { useEffect, useState } from 'react';
import axios from 'axios';

//Funksjon for å hente navnet til alle Pokemons for search suggestions
function FetchForSuggestions() {
	const [data, setData] = useState([]);
	const [suggestions, setSuggestions] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		//Limit = 905 fordi det er 905 Pokemons i pokedexen. Da vil man ikke få mega evolutions og andre former av pokemons.
		axios
			.get('https://pokeapi.co/api/v2/pokemon?limit=905&offset=0')
			.then((res) => {
				setData([]);
				//Lagrer alle pokemon navnene
				for (let i = 0; i < res.data.results.length; i++) {
					setData((currentSuggestions) => [
						...currentSuggestions,
						res.data.results[i].name
					]);
				}
			})
			.catch((err) => {
				console.log('error fetching suggestions', err);
			})
			.finally(setLoading(false));
	}, []);

	//Sorterer alle navnene alfabetisk
	useEffect(() => {
		const sorted = data.sort((a, b) => (a > b ? 1 : -1));
		setSuggestions(sorted);
	}, [data]);

	return { suggestions };
}
export default FetchForSuggestions;
