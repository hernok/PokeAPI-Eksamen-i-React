import FetchPokemonPage from '../Fetch/fetchPages';
import DisplayPokemon from '../Display/pokemonCardStyle';
import TypeSorter from '../Sort/typeSort';
import DataSort from '../Sort/dataSort';
import { PokemonContext } from '../Context/pokemonContext';
import { useEffect, useState } from 'react';
import Popup from '../Display/popup';
import '../Display/pokemonCardStyle.css';
import '../Sort/typeSort.css';
import '../Sort/dataSort.css';
import '../Display/popup.css';
import '../Search/searchBar.css';
import SearchBar from '../Search/searchBar';
import FetchPokemon from '../Fetch/getSearch';

const Pokemon = () => {
	//Data fra pokemon som har blitt trykket på for popup
	const [pokemonData, setPokemonData] = useState([]);
	//Startside som ikke endres
	const [initPage, setInitPage] = useState(
		'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0'
	);
	//Url med 20 pokemons som skal bli fetchet
	const [currentPage, setCurrentPage] = useState(initPage);
	const [isReset, setIsReset] = useState(false);
	//State som lagrer data for alle Pokemons som skal bli rendered på siden
	const [pokemonList, setPokemonList] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	const { allPokemon, loading, error, nextPage, prevPage } =
		FetchPokemonPage(currentPage);

	//useEffect som kjører funksjon for å fetche neste 20 Pokemon
	useEffect(() => {
		getNextPage(currentPage);
	}, [nextPage, prevPage, isReset]);

	const handleReset = () => {
		setCurrentPage(initPage);
		setIsReset(!isReset);
	};

	//Funksjon for å lukke popup
	const handleClose = () => {
		setIsOpen(false);
		setPokemonData([]);
	};

	//Funksjon for å hente data for Pokemons fra siden currentPage som inneholder en liste med navn til 20 Pokemon
	async function getNextPage(page) {
		setPokemonList([]);
		setCurrentPage(page);
		const createPokemonObject = async (result) => {
			for (let i = 0; i < result?.length; i++) {
				const res = await fetch(
					`https://pokeapi.co/api/v2/pokemon/${result[i].name}`
				);
				const data = await res.json();
				setPokemonList((currentPokemon) => [...currentPokemon, data]);
			}
		};
		await createPokemonObject(allPokemon.data?.results);
	}

	if (loading) return <h1>Loading</h1>;
	if (error) return console.log('error fetching: ', error);

	//Setter data til Pokemonen som ble trykket på, for popup
	const handleOpen = (pokemon) => {
		if (pokemon !== null) setIsOpen(true);
		setPokemonData(pokemon);
	};

	//Funksjon for search
	const getPokemon = async (query) => {
		const response = await FetchPokemon(query);
		if (query !== null) {
			setIsOpen(true);
			setPokemonData(response.data);
		}
	};

	return (
		<div>
			{/* 
			Popup vinduet som kommer etter man tyrykker på Pokemon 
			..//Display/popup.jsx
			*/}
			<Popup
				open={isOpen}
				close={() => handleClose()}
				click={() => handleOpen()}
				pokemonData={pokemonData}
				isClose={isOpen}
			/>
			{/* 
			Provider for context 
			..//Context/pokemonListContext.jsx 
			*/}
			<PokemonContext.Provider
				value={{
					currentPage,
					setCurrentPage,
					pokemonList,
					setPokemonList
				}}
			>
				{/* 
				Type knappene øverst på siden 
				..//Sort/typeSort.jsx 
				*/}
				<div className='button-wrapper'>
					<TypeSorter type='normal' />
					<TypeSorter type='fire' />
					<TypeSorter type='water' />
					<TypeSorter type='rock' />
					<TypeSorter type='grass' />
					<TypeSorter type='ice' />
					<TypeSorter type='fighting' />
					<TypeSorter type='steel' />
					<TypeSorter type='ground' />
					<TypeSorter type='flying' />
					<TypeSorter type='fairy' />
					<TypeSorter type='bug' />
					<TypeSorter type='electric' />
					<TypeSorter type='ghost' />
					<TypeSorter type='dragon' />
					<TypeSorter type='dark' />
					<TypeSorter type='poison' />
					<TypeSorter type='psychic' />
				</div>

				<div className='order-wrapper'>
					{/* 
					Knapp for å sortere etter navn 
					../Sort/dataSort.jsx 
					*/}
					<DataSort className='name-asc' value='NAME' toSort='name' />
					{/* 
					Knapp for å sortere etter id 
					../Sort/dataSort.jsx 
					*/}
					<DataSort className='id-asc' value='ID' toSort='id' />
				</div>
				{/* 
				Søkefelt 
				../Search/searchBar.jsx 
				*/}
				<SearchBar getPokemon={getPokemon} />
			</PokemonContext.Provider>
			{/* 
			Previous 20 knapp 
			*/}
			{prevPage !== null && pokemonList.length <= 40 && (
				<button
					className='load-more-button'
					onClick={() => setCurrentPage(prevPage)}
				>
					Previous 20
				</button>
			)}
			{/* 
			Reset knapp som setter currentPage til første side
			*/}
			{pokemonList.length > 40 && (
				<button className='load-more-button' onClick={() => handleReset()}>
					Reset
				</button>
			)}
			{/* 
			Next 20 knapp
			*/}
			{pokemonList.length <= 40 && (
				<button
					className='load-more-button'
					onClick={() => setCurrentPage(nextPage)}
				>
					{'Next 20'}
				</button>
			)}
			<div className='app-wrap'>
				{pokemonList &&
					pokemonList.map((pokemon, i) => {
						/* 
						Viser pokemon data og sender en funksjon som brukes til onClick på kortene
						..//Display/pokemonCardStyle.jsx
						 */

						return (
							<DisplayPokemon
								key={i ? i : null}
								id={pokemon.id ? pokemon.id : null}
								name={pokemon.name ? pokemon.name : null}
								image={pokemon.sprites.front_default}
								typeOne={pokemon.types[0] ? pokemon.types[0].type.name : null}
								typeTwo={pokemon.types[1] ? pokemon.types[1].type.name : null}
								func={() => handleOpen(pokemon)}
								isOpen={isOpen}
								setIsOpen={setIsOpen}
							/>
						);
					})}
			</div>
		</div>
	);
};

export default Pokemon;
