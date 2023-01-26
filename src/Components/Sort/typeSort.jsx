import { useContext, useEffect, useState } from 'react';
import { PokemonContext } from '../Context/pokemonContext';
import FetchPokemonPage from '../Fetch/fetchPages';

const TypeSort = ({ type }) => {
	const [typePage, setTypePage] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const { setPokemonList } = useContext(PokemonContext);
	const { allPokemon } = FetchPokemonPage(typePage);

	//Url med type data
	const handleType = () => {
		setTypePage(`https://pokeapi.co/api/v2/type/${type}`);
	};

	useEffect(() => {
		//Data for Pokemons som skal bli vist
		setPokemonList([]);
		//Funksjon under
		sortByType();
	}, [allPokemon.data?.pokemon]);

	//Fetcher alle Pokemon navn fra type siden individuelt og legger de i pokemonList
	const sortByType = () => {
		setLoading(true);
		const createPokemonObject = async (result) => {
			for (let i = 0; i < result?.length; i++) {
				const res = await fetch(
					`https://pokeapi.co/api/v2/pokemon/${result[i].pokemon.name}`
				).catch((err) => setError(err));
				const data = await res.json();
				if (data?.id < 10000) {
					setPokemonList((currentPokemon) => [...currentPokemon, data]);
				}
			}
		};
		setLoading(false);
		createPokemonObject(allPokemon.data?.pokemon);
	};

	if (loading) return <h1>Loading</h1>;
	if (error) return console.log('error fetching: ', error);

	//Knapp for å hente de forskjellige type dataene
	return (
		<>
			<button
				onClick={() => handleType()}
				type='button'
				className={'sort-' + type}
				id='sort-button'
			>
				{type.charAt(0).toUpperCase() + type.slice(1)}
			</button>
		</>
	);
};
export default TypeSort;
