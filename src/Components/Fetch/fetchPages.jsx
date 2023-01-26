import { useEffect, useState } from 'react';
import axios from 'axios';

function FetchPokemonPage(url) {
	const [nextPage, setNextPage] = useState(null);
	const [prevPage, setPrevPage] = useState(null);
	const [allPokemon, setAllPokemon] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	//Fetcher 20 pokemon samt url for neste og forrige 20.
	useEffect(() => {
		setLoading(true);
		setAllPokemon([]);
		axios
			.get(url)
			.then((res) => {
				setNextPage(res.data.next);
				setPrevPage(res.data.previous);
				setAllPokemon(res);
			})
			.catch((err) => {
				setError('error fetching page', err);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [url]);

	return {
		nextPage,
		prevPage,
		allPokemon,
		loading,
		error
	};
}
export default FetchPokemonPage;
